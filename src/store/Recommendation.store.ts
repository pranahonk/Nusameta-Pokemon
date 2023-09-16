import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Book} from '../types/book';
import {RootState} from './store';
import {BookApi} from "../services/BookApi";
import {util} from "../services/util";


const {getBooks} = BookApi();

interface FavoritesProps {
    recommendation: Book[];
    totalPages: number;
}


const initialState:FavoritesProps = {
    recommendation: [],
    totalPages: 0,
}

interface getBooksWithTermsProps {
    terms: string;
    page: number;
}

export const getBooksWithRecommendation = createAsyncThunk<any, getBooksWithTermsProps>('books/getBooksWithRecommendation', async ({ terms, page }, thunkAPI) => {
    try {
        const response = await getBooks(terms, page);

        return response;
    } catch (error) {
        // Handle errors here if needed;
        throw error;
    }
});

export const RecommendationSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {


    },
    extraReducers: (builder: any) => {
        builder
            .addCase(getBooksWithRecommendation.fulfilled, (state: any, action: any) => {
                if (action.payload.totalItems === 0) {
                    state.books = [];
                    return;
                }
                state.recommendation = util.formatBooks(action.payload.items, state.totalItemsPerPage);
                state.totalPages = Math.ceil(action.payload.totalItems / state.totalItemsPerPage);
            });
    },
})

export const {} = RecommendationSlice.actions;
export const SelectRecommendation = (state: RootState) => state.recommendation;

export default RecommendationSlice.reducer;
