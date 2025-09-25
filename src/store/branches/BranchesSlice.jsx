import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import branchesService from "./BranchesService";

const initialState = {
   branches: [],
   isLoading: false,
   error: null
}

export const branchesGet = createAsyncThunk(
   "map/branchesGet",
   async (query, thunkAPI) => {
      try {
         
         return await branchesService.getBranches(query);
      } catch (error) {
         const message =
            (error.response && error.response.data && error.response.data) ||
            error.message ||
            error.toSrting();
         return thunkAPI.rejectWithValue(message);
      }
   }
);

const branchesGetSlice = createSlice({
   name: "branchesGet",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(branchesGet.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(branchesGet.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.branches = action.payload.data;
         })
         .addCase(branchesGet.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.branches = [];
         });
   },
});
export default branchesGetSlice.reducer;