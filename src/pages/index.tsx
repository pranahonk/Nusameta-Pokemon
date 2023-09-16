import {Box, Button, Heading, useToast} from "@chakra-ui/react";
import type {NextPage} from "next";
import {useAppDispatch, useAppSelector} from "../store/store";
import {cleanStates, filterBooks, filterYear, SelectBooks, setTerms} from "../store/Books.store";
import Card from "../Components/Card";
import Paginate from "../Components/Paginate";
import {useEffect, useState} from "react";
import {BookApi, pokemonApi} from "../services/BookApi";
import useDebounce from "../hooks/useDebounce";
import {SelectPokemon, setPokemonList} from "../store/Pokemon.store";
import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";


interface ErrorType {
    error: string;
}


const Home: NextPage = () => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';
    const [select, setSelect] = useState('');
    const [grid, setGrid] = useState('grid');
    const [startDate, setStartDate] = useState(new Date("2015/02/08"));
    const [endDate, setEndDate] = useState(new Date("2023/04/08"));
    const [search, setSearch] = useState('');
    const debounceSearch = useDebounce(search, 1000);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const { count, next, previous, results } = useAppSelector(SelectPokemon);

    const { data: pokemonList, refetch, isLoading, isFetching, error, status }  = pokemonApi({ offset, limit });

    const onclickNext = () => {
        console.log(next);
        const queryString = next.split('?')[1];

        // Use URLSearchParams to parse the query string
        const urlSearchParams = new URLSearchParams(queryString);

        // Get the values of 'offset' and 'limit' from the URL
        const offsetParam = urlSearchParams.get("offset");
        const limitParam = urlSearchParams.get("limit");

        console.log(offsetParam);
        console.log(limitParam);

        setOffset(Number(offsetParam));
        setLimit(Number(limitParam));
    }

    useEffect(() => {
        console.log("masuk kesini")
        // console.log(offset);
        // console.log(limit);
        refetch
    }, [offset, limit]);



    useEffect(() => {
        if (search) {
            return;
        }

        dispatch(cleanStates());
    }, [debounceSearch, dispatch, search]);


    useEffect(() => {
        console.log(pokemonList?.data)
        if(pokemonList?.data){
            dispatch(setPokemonList(pokemonList.data));
        }

    }, [pokemonList]);


    useEffect(() => {
        dispatch(filterBooks(select));
    }, [select]);

    return (
    <Box p={{ base: "2rem 0.5rem", md: "1rem 2rem" }} flex="1 0  auto">

      <Heading textAlign="center" m="2rem 0">
          List of pokemon
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
              ) :<div className="grid grid-cols-5 grid-rows-8 gap-4">
                  {pokemonList?.data?.results.map((pokemon, y) => <Card key={`${pokemon.name}-${y}`} pokemon={pokemon} view={grid} />
                  )}
              </div>
          }
      </Box>

      <Box
      marginTop="1rem"
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      >
          {
              previous && (
                  <Button colorScheme='teal' size='sm'>
                      <ArrowLeftIcon />
                      &nbsp; Prev
                  </Button>
              )
          }
          {
              next.length > 0 && (
                  <Button colorScheme='teal' size='sm'
                          onClick={onclickNext}
                  >
                      Next&nbsp;
                      <ArrowRightIcon />
                  </Button>
              )
          }
      </Box>
    </Box>
  );
};

export default Home;
