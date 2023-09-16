import {createAsyncThunk, createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {BookApi, pokemonApi} from '../services/BookApi';
import {Book} from '../types/book';
import {RootState} from './store';
import {util} from "../services/util";

interface getPokemonListProps {
    count: number;
    next: string;
    previous: string;
    results: any
}

interface PokemonProps {
    count: number;
    next: string;
    previous: string;
    results: any

}

const initialState:PokemonProps = {
    results: [],
    count: 0,
    next: "",
    previous: "",
}

export const PokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setPokemonList: (state, action: PayloadAction<getPokemonListProps>): void => {
            state.count = action.payload.count;
            state.next = action.payload.next;
            state.results = action.payload.results;
            state.previous = action.payload.previous
        },
    },

})

export const {setPokemonList} = PokemonSlice.actions;
export const SelectPokemon = (state: RootState) => state.pokemon;

export default PokemonSlice.reducer;
