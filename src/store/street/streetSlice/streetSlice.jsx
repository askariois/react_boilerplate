import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import streetService from "../streetService";

const initialState = {
  street: [],
  lastAddress: [],
  pickupAddress: [],
  fromCoordsAddress: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  errorStatus: null, // Добавляем поле для хранения кода ошибки
};

export const streetGet = createAsyncThunk(
  "streetGet",
  async (data, thunkAPI) => {
    try {
      return await streetService.streetGet(data);
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

// get lastAddress
export const lastAddressGet = createAsyncThunk(
  "lastAddressGet",
  async (_, thunkAPI) => {
    try {
      return await streetService.lastAddressGet();
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

// для самовывоза
export const pickupAddressGet = createAsyncThunk(
  "pickupAddressGet",
  async (data, thunkAPI) => {
    try {
      return await streetService.pickupAddressGet(data);
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

// для fromCoordsGet
export const fromCoordsGet = createAsyncThunk(
  "fromCoordsGet",
  async (data, thunkAPI) => {
    try {
      return await streetService.fromCoordsGet(data);
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

const streetGetSlice = createSlice({
  name: "streetGet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(streetGet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(streetGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.street = action.payload.data.data;
        state.errorStatus = null; // Сбрасываем статус ошибки
      })
      .addCase(streetGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.errorStatus = action.payload.status; // Сохраняем код ошибки
        state.street = null;
      })
      .addCase(lastAddressGet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(lastAddressGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lastAddress = action.payload.data.data;
        state.errorStatus = null; // Сбрасываем статус ошибки
      })
      .addCase(lastAddressGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.errorStatus = action.payload.status; // Сохраняем код ошибки
        state.street = null;
      })
      .addCase(pickupAddressGet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pickupAddressGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pickupAddress = action.payload.data.data;
        state.errorStatus = null; // Сбрасываем статус ошибки
      })
      .addCase(pickupAddressGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.errorStatus = action.payload.status; // Сохраняем код ошибки
        state.street = null;
      })
      .addCase(fromCoordsGet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fromCoordsGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fromCoordsAddress = action.payload.data.data;
        state.errorStatus = null; // Сбрасываем статус ошибки
      })
      .addCase(fromCoordsGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.errorStatus = action.payload.status; // Сохраняем код ошибки
        state.street = null;
      });
  },
});

export default streetGetSlice.reducer;
