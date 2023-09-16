import axios, { AxiosResponse } from 'axios';
import {useQuery} from "react-query"; // Import AxiosResponse


const API_KEY = process.env.BOOK_KEY;



export function BookApi() {
  type Todo = {
    id: number
    state: string
  }
  type Todos = ReadonlyArray<Todo>

  const fetchTodos = async (terms: string, page: number): Promise<Todos> => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${terms}&key=${API_KEY}&maxResults=12&startIndex=${page}`, {
      timeout: 2000, // Set a 2000 ms (2-second) timeout
    })
    return response.data
  }
  const getBooks = async (terms: string, page: number) => {
    try {
      const response : any = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${terms}&key=${API_KEY}&maxResults=12&startIndex=${page}`, {
        timeout: 2000, // Set a 2000 ms (2-second) timeout
      });

      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle timeout-specific logic here
        return Promise.reject({ error: 'Request timed out' });
      }
      return Promise.reject({ error: `Error searching for book ${error?.message}` });
    }
  };

  return {
    getBooks,
    fetchTodos
  };
}

export function pokemonApi ({offset, limit}){

  const { data, refetch, isLoading , isFetching, error, status } = useQuery(["todos"], () =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`), {
      enabled: !!offset,
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
