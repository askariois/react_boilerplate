import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import cartService from "../service";

const initialState = {
    addedProduct: null,
    error: null,
    addProductLoading: false
}

export const addProductThunk = createAsyncThunk(
    'addProductThunk',
    async ( data, thunkAPI ) => {
        try {
            return await cartService.addProduct( data )
        }catch ( error ) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const addProductSlice = createSlice ({
    name: 'cart/add',
    initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder
            .addCase( addProductThunk.pending, ( state ) => {
                state.addProductLoading = true
            })
            .addCase( addProductThunk.fulfilled, ( state, action ) => {
                state.addProductLoading = false
                state.addedProduct = action.payload
                state.error = null

            })
            .addCase( addProductThunk.rejected, ( state, action ) => {
                state.addProductLoading = false
                state.error = action.payload
                state.addedProduct = null
            })
    }
})
export default  addProductSlice.reducer