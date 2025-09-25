import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pizzeriaService from "../PizzeriaService";

const initialState = {
  pizzeria: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Получение сообщений чата
export const getPizzeria = createAsyncThunk(
  "pizzeria/getPizzeria",
  async (pizzeriaId, thunkAPI) => {
    try {
      return await pizzeriaService.getPizzeria(pizzeriaId);
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

const pizzeriaSlice = createSlice({
  name: "pizzeria",
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
      .addCase(getPizzeria.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPizzeria.fulfilled, (state, pizzeria) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pizzeria = pizzeria.payload.data;
      })
      .addCase(getPizzeria.rejected, (state, pizzeria) => {
        state.isLoading = false;
        state.isError = true;
        state.message = pizzeria.payload;
        state.pizzeria = [];
      });
  },
});

export const { reset } = pizzeriaSlice.actions;
export default pizzeriaSlice.reducer;
