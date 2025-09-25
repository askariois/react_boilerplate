import axios from "axios";

const getChatMessages = async () => {
  const response = await axios.get(`chat/messages`, {
    withCredentials: true,
  });
  return response.data;
};

const sendMessage = async (messageData) => {
  const response = await axios.post(`chat/send`, messageData, {
    withCredentials: true,
  });
  return response.data;
};

const chatService = {
  getChatMessages,
  sendMessage,
};

export default chatService;
