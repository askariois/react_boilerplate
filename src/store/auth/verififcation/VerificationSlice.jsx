import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../authService";

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// verification user

export const verification = createAsyncThunk(
  "auth/verification",
  async (data, thunkAPI) => {
    try {
      return await authService.verification(data);
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

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(verification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export default verificationSlice.reducer;
