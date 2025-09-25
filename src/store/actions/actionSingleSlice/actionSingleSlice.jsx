import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import actionsService from "../ActionsService";

const initialState = {
  action: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Получение сообщений чата
export const singleAction = createAsyncThunk(
  "action/singleAction",
  async (data, thunkAPI) => {
    try {
      return await actionsService.singleAction(data);
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

const singleActionSlice = createSlice({
  name: "singleAction",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(singleAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singleAction.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.action = actions.payload.data;
      })
      .addCase(singleAction.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.action = [];
      });
  },
});

export const { reset } = singleActionSlice.actions;
export default singleActionSlice.reducer;
