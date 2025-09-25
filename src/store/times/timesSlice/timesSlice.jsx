import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import timesService from "../timesService";

const initialState = {
  times: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  errorStatus: null, // Добавляем поле для хранения кода ошибки
};

// get user
export const timesGet = createAsyncThunk("timesGet", async (data, thunkAPI) => {
  try {
    return await timesService.timesGet(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    const status = error.response ? error.response.status : null;
    return thunkAPI.rejectWithValue({ message, status });
  }
});

const timesGetSlice = createSlice({
  name: "timesGet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(timesGet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(timesGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.times = action.payload.data.data;
        state.errorStatus = null; // Сбрасываем статус ошибки
      })
      .addCase(timesGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.errorStatus = action.payload.status; // Сохраняем код ошибки
        state.times = null;
      });
  },
});

export default timesGetSlice.reducer;
