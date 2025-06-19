import { configureStore } from '@reduxjs/toolkit';
import MovieReducer from './MovieSlice';

export const store = configureStore({
    reducer: {
        MovieData: MovieReducer
    },
})