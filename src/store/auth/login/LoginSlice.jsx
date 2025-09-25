import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../authService";

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//  user login

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await authService.login(data);
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

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export default loginSlice.reducer;
