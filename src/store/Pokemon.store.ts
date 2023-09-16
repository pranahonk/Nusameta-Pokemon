import {createAsyncThunk, createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {BookApi, pokemonApi} from '../services/BookApi';
import {Book} from '../types/book';
import {RootState} from './store';
import {util} from "../services/util";

// Define types for offset and limit.
type Offset = number;
type Limit = number;

// Define a type for the object returned by the function.
type PokemonListResult = {
    data: any; // Replace 'any' with the actual type of 'data'.
    refetch: () => void;
    isLoading: boolean;
    isFetching: boolean;
    error: any; // Replace 'any' with the actual type of 'error'.
    status: string;
};

interface PokemonProps {
    pokemon: any;
    offset: number;
    limit: number;
    isLoading: boolean;
    isFetching: boolean;
    error: any;
    status: string;

}

const initialState:PokemonProps = {
    pokemon: [],
    offset: 0,
    limit: 0,
    isLoading: false,
    isFetching: false,
    error: [],
    status: null,
}

export const getPokemonList = async ({ offset, limit }: { offset: Offset; limit: Limit }): Promise<PokemonListResult>  => {
    try {
        // Make an API request using pokemonApi with the provided offset and limit.
        const { data, refetch, isLoading, isFetching, error, status } = await pokemonApi({ offset, limit });

        // Return an object with the fetched data and other relevant properties.
        return {
            data,         // The fetched data (replace 'any' with the actual type).
            refetch,      // A function to manually trigger a refetch.
            isLoading,    // Indicates whether the request is in progress.
            isFetching,   // Indicates whether the request is currently fetching data.
            error,        // Any error that occurred during the request (replace 'any' with the actual type).
            status        // The HTTP status of the response.
        };
    } catch (error) {
        throw error; // You can also replace 'any' with a specific error type.
    }
}

export const PokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {

    },
    extraReducers: (builder: any) => {
        builder
            .addCase(getBooksWithTerms.fulfilled, (state: any, action: any) => {
                if (action.payload.totalItems === 0) {
                    state.books = [];
                    return;
                }
                state.books = util.formatBooks(action.payload.items, state.totalItemsPerPage);
                state.totalPages = Math.ceil(action.payload.totalItems / state.totalItemsPerPage);
            });
    },

})

export const {setTerms,cleanStates, filterBooks, setBookFromData, filterYear } = BooksSlice.actions;
export const SelectBooks = (state: RootState) => state.books;

export default PokemonSlice.reducer;
