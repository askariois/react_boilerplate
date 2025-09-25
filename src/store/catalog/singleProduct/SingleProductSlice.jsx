import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import catalog from "../catalogService";

const initialState = {
    product: [],
    isLoading: false,
    error: null
}

export const getSingleProductThunk = createAsyncThunk(
    "catalog/getSingleProductThunk",
    async ( url, thunkAPI) => {
        try {
            return await catalog.getSingleProduct( url );
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toSrting();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const getSingleProductSlice = createSlice({
    name: "catalog/SingleProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSingleProductThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleProductThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.product = action.payload;
            })
            .addCase(getSingleProductThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.product = [];
            });
    },
});
export default getSingleProductSlice.reducer;