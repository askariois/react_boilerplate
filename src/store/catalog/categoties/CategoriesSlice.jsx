import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import catalog from "../catalogService";

const initialState = {
    categories: [],
    isLoading: false,
    error: null
}

export const getCategoriesThunk = createAsyncThunk(
    "catalog/getCategoriesThunk",
    async (thunkAPI) => {
        try {
            return await catalog.getCategories();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toSrting();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const getCategoriesSlice = createSlice({
    name: "catalog/Categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoriesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.categories = action.payload;
            })
            .addCase(getCategoriesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.categories = [];
            });
    },
});
export default getCategoriesSlice.reducer;