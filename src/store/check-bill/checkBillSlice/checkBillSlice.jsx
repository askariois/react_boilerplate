import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import checkBillService from "../checkBillService";

const initialState = {
  orderBill: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const checkBill = createAsyncThunk(
  "checkBill",
  async (data, thunkAPI) => {
    try {
      return await checkBillService.checkBill(data);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
        status: error.response ? error.response.status : null,
        data: error.response ? error.response.data : null, // <-- добавил
      });
    }
  }
);

const checkBillSlice = createSlice({
  name: "checkBill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkBill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkBill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orderBill = action.payload.data.data;
        state.errorStatus = null; // Сбрасываем статус ошибки
      })
      .addCase(checkBill.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.errorStatus = action.payload.status;
        state.orderBill = action.payload.data || null;
      });
  },
});

export default checkBillSlice.reducer;
