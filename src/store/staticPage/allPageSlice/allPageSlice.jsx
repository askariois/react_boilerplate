import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pagesService from "../staticPageService";

const initialState = {
  pages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Получение сообщений чата
export const allPages = createAsyncThunk(
  "pages/alls",
  async ( thunkAPI) => {
    try {
      return await pagesService.allPage();
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

const allPagesSlice = createSlice({
  name: "allPages",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(allPages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allPages.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pages = action.payload.data;
      })
      .addCase(allPages.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.pages = [];
      });
  },
});

export default allPagesSlice.reducer;
