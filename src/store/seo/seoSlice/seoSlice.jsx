import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import seoService from "../seoService";

const initialState = {
  seo: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Получение сообщений чата
export const seoData = createAsyncThunk(
  "seo/data",
  async (data, thunkAPI) => {
    try {
      return await seoService.seo(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const seoDataSlice = createSlice({
  name: "seoData",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(seoData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(seoData.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.seo = action.payload.data.meta;
      })
      .addCase(seoData.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.seo = [];
      });
  },
});

export default seoDataSlice.reducer;
