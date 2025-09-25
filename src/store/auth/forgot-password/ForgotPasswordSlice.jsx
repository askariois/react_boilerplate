import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../authService";

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// forgotPassword user

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassword(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export default forgotPasswordSlice.reducer;
