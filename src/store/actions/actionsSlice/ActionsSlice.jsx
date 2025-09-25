import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import actionsService from "../ActionsService";

const initialState = {
  actions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Получение сообщений чата
export const getActions = createAsyncThunk(
  "actions/getActions",
  async (actionId, thunkAPI) => {
    try {
      return await actionsService.getActions(actionId);
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

const actionsSlice = createSlice({
  name: "actions",
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
      .addCase(getActions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActions.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.actions = actions.payload.data;
      })
      .addCase(getActions.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.actions = [];
      });
  },
});

export const { reset } = actionsSlice.actions;
export default actionsSlice.reducer;
