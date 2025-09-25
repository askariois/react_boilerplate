import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import cartService from "../service";

const initialState = {
    cart: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
};

// get user
export const getCartThunk = createAsyncThunk(
    "cart/getCartThunk",
    async (thunkAPI) => {
        try {
            return await cartService.getCart();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const getCartSLice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cart = action.payload;
            })
            .addCase(getCartThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
    },
});

export default getCartSLice.reducer;
