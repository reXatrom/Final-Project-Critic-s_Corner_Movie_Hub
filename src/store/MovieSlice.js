import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData: []  // OMDb movie data array
    // removed imageURL since OMDb returns full image URLs
}

export const MovieSlice = createSlice({
    name: 'MovieData',
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.bannerData = action.payload;
        }
        // removed setImageURL reducer since no longer needed
    }
})

export const { setBannerData } = MovieSlice.actions;

export default MovieSlice.reducer;
