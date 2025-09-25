import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../authService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// register user

export const repeatCode = createAsyncThunk(
  "auth/repeatCode",
  async (data, thunkAPI) => {
    try {
      return await authService.sendAccept(data);
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

const repeatCodeSlice = createSlice({
  name: "repeatCode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(repeatCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(repeatCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(repeatCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default repeatCodeSlice.reducer;
