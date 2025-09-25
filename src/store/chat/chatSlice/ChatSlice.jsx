import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "../ChatService";

const initialState = {
  messages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Получение сообщений чата
export const getChatMessages = createAsyncThunk(
  "chat/getMessages",
  async (chatId, thunkAPI) => {
    try {
      return await chatService.getChatMessages(chatId);
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

// Отправка нового сообщения
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData, thunkAPI) => {
    try {
      return await chatService.sendMessage(messageData);
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

const chatSlice = createSlice({
  name: "chat",
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
      .addCase(getChatMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload.data.messages || [action.payload.data]; // Обработка случая с одним сообщением
      })
      .addCase(getChatMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.messages = [];
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages.push(action.payload.data.message); // Извлекаем объект message из ответа
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;
