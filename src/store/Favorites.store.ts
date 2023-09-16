import { createSlice ,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {PokemonData} from '../types/book';
import { RootState } from './store';



interface FavoritesProps {
  favorites: PokemonData[];
}


const initialState:FavoritesProps = {
  favorites: []
}

export const FavoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<PokemonData>) => {
      const bookFilter = state.favorites.find((book) => {
        return book.name === action.payload.name;
      });

      if (bookFilter) return;

      const url = `https://pokeapi.co/api/v2/pokemon/${action.payload.id}/`; // Generate URL based on id
      const pokemonWithUrl: PokemonData = {
        ...action.payload,
        url, // Include the URL property
      };

      state.favorites = [...state.favorites, pokemonWithUrl];
      localStorage.setItem('books', JSON.stringify(state.favorites));
    },
    getFavorites: (state) => {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      state.favorites = books;
    },

  },
})

export const {addFavorite, getFavorites } = FavoriteSlice.actions;
export const SelectFavorites = (state: RootState) => state.favorites;

export default FavoriteSlice.reducer;
