import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import cartService from "../service";

const initialState = {
    updatedProduct: null,
    error: null,
    addProductLoading: false
}

export const updateProductThunk = createAsyncThunk(
    'updateProductThunk',
    async ( data, thunkAPI ) => {
        try {
            return await cartService.updateProduct( data )
        }catch ( error ) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const updateProductSlice = createSlice ({
    name: 'cart/update',
    initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder
            .addCase( updateProductThunk.pending, ( state ) => {
                state.addProductLoading = true
            })
            .addCase( updateProductThunk.fulfilled, ( state, action ) => {
                state.addProductLoading = false
                state.updatedProduct = action.payload
                state.error = null

            })
            .addCase( updateProductThunk.rejected, ( state, action ) => {
                state.addProductLoading = false
                state.error = action.payload
                state.updatedProduct = null
            })
    }
})
export default  updateProductSlice.reducer