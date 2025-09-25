import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getRecommendations} from "./service";

const initialState = {
    list: null,
    error: null,
    isLoading: false
}

export const getRecommendationThunk = createAsyncThunk(
    'getRecommendationThunk/get',
    async (url,  thunkAPI ) => {
        try {
            return await getRecommendations( url )
        }catch ( error ) {
            const message =
                (error.response && error.response.data && error.response.data) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const recommendationsSlice = createSlice({
    name: "recommendationsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRecommendationThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRecommendationThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.list = action.payload.data;
            })
            .addCase(getRecommendationThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export default recommendationsSlice.reducer