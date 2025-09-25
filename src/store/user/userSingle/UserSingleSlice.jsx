// userSingleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../UserService";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: "",
};

// get user
export const userSingle = createAsyncThunk(
  "auth/userSingle",
  async (data, thunkAPI) => {
    try {
      return await userService.userSingle(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data, thunkAPI) => {
    try {
      const response = await userService.updateUser(data);
      return response.data; // Предполагаем, что API возвращает обновленные данные
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSingleSlice = createSlice({
  name: "userSingle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSingle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSingle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
      })
      .addCase(userSingle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // Обновляем user с данными из ответа
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default userSingleSlice.reducer;
