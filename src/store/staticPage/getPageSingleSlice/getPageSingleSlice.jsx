import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pagesService from "../staticPageService";

const initialState = {
  pageSingle: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Получение сообщений чата
export const getPageSingle = createAsyncThunk(
  "pages/single",
  async (url,  thunkAPI) => {
    try {
      return await pagesService.getPageSingle(url);
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

const getPageSingleSlice = createSlice({
  name: "getPageSingle",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPageSingle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPageSingle.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pageSingle = action.payload.data;
      })
      .addCase(getPageSingle.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.pageSingle = [];
      });
  },
});

export default getPageSingleSlice.reducer;
