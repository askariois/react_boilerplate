import {createAsyncThunk} from "@reduxjs/toolkit";
import favoriteService from "./service";

export const getFavoriteThunk = createAsyncThunk(
    'addFavoriteThunk/get',
    async (  thunkAPI ) => {
        try {
            return await favoriteService.getFavorites()
        }catch ( error ) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const addFavoriteThunk = createAsyncThunk(
    'addFavoriteThunk/add',
    async ( product, thunkAPI ) => {
        try {
            return await favoriteService.addFavorites( product )
        }catch ( error ) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)
export const removeFavoriteThunk = createAsyncThunk(
    'removeFavoriteThunk/add',
    async ( product, thunkAPI ) => {
        try {
            return await favoriteService.removeFavorites( product )
        }catch ( error ) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)