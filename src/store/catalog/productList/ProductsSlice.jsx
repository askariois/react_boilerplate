import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import catalog from "../catalogService";

const initialState = {
    products: [],
    isLoading: false,
    error: null
}

export const getProductsThunk = createAsyncThunk(
    "catalog/getProductsThunk",
    async ( data, thunkAPI) => {
        try {
           return await catalog.getProductsByCategoryId( data );
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toSrting();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const getProductsSlice = createSlice({
    name: "catalog/Products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = action.payload;
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.products = [];
            });
    },
});
export default getProductsSlice.reducer;