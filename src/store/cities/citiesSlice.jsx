// userSingleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cityService from "./citiesService";

const initialState = {
  cities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get user
export const cityGet = createAsyncThunk(
  "cityGet",
  async (data, thunkAPI) => {
    try {
      return await cityService.cityGet(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const cityGetSlice = createSlice({
  name: "cityGet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cityGet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cityGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cities = action.payload.data.data;
      })
      .addCase(cityGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cities = null;
      })
  },
});

export default cityGetSlice.reducer;
