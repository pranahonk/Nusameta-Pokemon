import axios from 'axios';
import {useQuery} from "react-query"; // Import AxiosResponse


export function pokemonApi ({offset, limit}){

  const { data, refetch, isLoading , isFetching, error, status } = useQuery(["pokemon"], () =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
  );

  return{
    data,
    refetch,
    isLoading,
    isFetching,
    error,
    status
  }

}

export function pokemonApiDetail ({id}){

  const { data, refetch, isLoading , isFetching, error, status } =
      useQuery(["pokemonDetail"], () =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),{
      enabled: !!id
      }
  );

  return{
    data,
    refetch,
    isLoading,
    isFetching,
    error,
    status
  }
}
