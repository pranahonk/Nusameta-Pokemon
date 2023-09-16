import {Box, Heading, useToast} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";

import type {NextPage} from "next";
import {useAppDispatch, useAppSelector} from "../store/store";
import Card from "../Components/Card";
import {getFavorites, SelectFavorites} from "../store/Favorites.store";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {BookApi} from "../services/BookApi";
import {util} from "../services/util";


interface ErrorType {
    error: string;
}
const Recommendation: NextPage = () => {
    const {getBooks} = BookApi();
    const dispatch = useAppDispatch();
    const { favorites } = useAppSelector(SelectFavorites);
    const toast = useToast();
    const circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';
    const [grid, setGrid] = useState('grid');
    const [recommend, setRecommend] = useState('');
    const [newRecommendation, setNewRecommendation] = useState([]);

    useEffect(() => {
        dispatch(getFavorites());
    }, []);


    useEffect(()=>{
        setRecommend( favorites[0]?.authors || "");
    }, [favorites])

    const { data, refetch, isLoading , isFetching, error, status} = useQuery({
        queryKey: ['getBooks'],
        queryFn: () => getBooks(recommend, 0),
        enabled: !!recommend,
        // useErrorBoundary: (error) => error.response?.status >= 500,
    });

    useEffect(()=>{
        if(data){
            setNewRecommendation(util.formatBooks(data?.items, 12))
        }

    }, [data])

    return (
        <Box p={{ base: "2rem 0.5rem", md: "1rem 2rem" }} flex="1 0  auto">

            <Heading textAlign="center" m="2rem 0">
                Your recommendation book
            </Heading>
            {
                error && (
                    toast({
                        title: String((error as ErrorType).error),
                        position: 'top',
                        isClosable: true,
                        status: 'error',
                        duration: 2000,
                    })
                )
            }
            <Box
                margin="0 auto"
                display="flex"
                gap="2rem"
                flexWrap="wrap"
                justifyContent="center"
                paddingTop="2rem"
            >
                {
                    isFetching ? (
                        <div className='flex'>
                            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                            <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
                            <div className={`${circleCommonClasses} animate-bounce400`}></div>
                        </div>
                    ) : (
                        newRecommendation?.map((book) => <Card key={book.id} book={book} view={grid} />)
                    )
                }
            </Box>
        </Box>
    );
};

export default Recommendation;
