import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loyalityService from "../loyalityService";

const initialState = {
  loyality: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  errorStatus: null, // Добавляем поле для хранения кода ошибки
};

// get user
export const loyalityGet = createAsyncThunk(
  "loyalityGet",
  async (_, thunkAPI) => {
    try {
      return await loyalityService.loyalityGet();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      const status = error.response ? error.response.status : null;
      return thunkAPI.rejectWithValue({ message, status });
    }
  }
);

const loyalityGetSlice = createSlice({
  name: "loyalityGet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loyalityGet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loyalityGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loyality = action.payload.data.data;
        state.errorStatus = null; // Сбрасываем статус ошибки
      })
      .addCase(loyalityGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.errorStatus = action.payload.status; // Сохраняем код ошибки
        state.loyality = null;
      });
  },
});

export default loyalityGetSlice.reducer;
