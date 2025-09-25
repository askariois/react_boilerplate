import {createSlice} from "@reduxjs/toolkit";
import {addFavoriteThunk, getFavoriteThunk, removeFavoriteThunk} from "./favoriteThunk";

const initialState = {
    list: null,
    error: null,
    isLoading: false
}

const favoritesSlice = createSlice({
    name: "favoriteSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFavoriteThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFavoriteThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.list = action.payload.data;
            })
            .addCase(getFavoriteThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addFavoriteThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addFavoriteThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.list = action.payload;
            })
            .addCase(addFavoriteThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(removeFavoriteThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.list = action.payload;
            })
            .addCase(removeFavoriteThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export default favoritesSlice.reducer