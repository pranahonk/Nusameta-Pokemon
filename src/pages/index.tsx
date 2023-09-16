import {Box, Button, Heading, useToast} from "@chakra-ui/react";
import type {NextPage} from "next";
import {useAppDispatch, useAppSelector} from "../store/store";
import Card from "../Components/Card";
import {useEffect, useState} from "react";
import {pokemonApi} from "../services/BookApi";
import {SelectPokemon, setPokemonList} from "../store/Pokemon.store";
import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";


interface ErrorType {
    error: string;
}


const Home: NextPage = () => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const { count, next, previous, results } = useAppSelector(SelectPokemon);

    const { data: pokemonList, refetch, isLoading, isFetching, error, status }  =
        pokemonApi({ offset, limit });

    const onclickNext = async (url: string) => {
        const queryString = url.split('?')[1];

        // Use URLSearchParams to parse the query string
        const urlSearchParams = new URLSearchParams(queryString);

        // Get the values of 'offset' and 'limit' from the URL
        const offsetParam = urlSearchParams.get("offset");
        const limitParam = urlSearchParams.get("limit");


        await setOffset(Number(offsetParam));
        await setLimit(Number(limitParam));
        setTimeout(()=>{
            refetch()
        }, 1000)

    }


    useEffect(() => {
        if(pokemonList?.data){
            dispatch(setPokemonList(pokemonList.data));
        }

    }, [pokemonList]);


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
                  {pokemonList?.data?.results.map((pokemon, y) => <Card key={`${pokemon.name}-${y}`} pokemon={pokemon} view={'grid'} />
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
              (pokemonList?.data?.previous && pokemonList?.data?.previous?.length > 0) && (
                  <Button colorScheme='teal' size='sm'
                          onClick={()=> onclickNext(previous)}
                  >
                      <ArrowLeftIcon />
                      &nbsp; Prev
                  </Button>
              )
          }
          {
              pokemonList?.data?.next.length > 0 && (
                  <Button colorScheme='teal' size='sm'
                          onClick={()=> onclickNext(next)}
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
