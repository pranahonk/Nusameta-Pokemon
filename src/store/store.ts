import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import FavoriteReducer from "./Favorites.store";
import PokemonReducer from "./Pokemon.store";


const store = configureStore({
  reducer: {
    favorites: FavoriteReducer,
    pokemon: PokemonReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;


export const RootReducer = combineReducers({
  favorites: FavoriteReducer,
  pokemon: PokemonReducer
})


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
