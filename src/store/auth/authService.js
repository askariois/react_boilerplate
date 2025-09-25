import axios from "axios";

// Register user

const register = async (data) => {
  const response = await axios.post("register", data);
  return { data: response.data, status: response.status };
};
//


const login = async (data) => {
  const response = await axios.post("login", data); 
  return { data: response.data, status: response.status };
};
//


const verification = async (data) => {
  const response = await axios.post("activateUser", data); 
  return { data: response.data, status: response.status };
};
//

const forgotPassword = async (data) => {
  const response = await axios.post("rememberPassword", data); 
  return { data: response.data, status: response.status };
};
//


const sendAccept = async (data) => {
  const response = await axios.post("sendAccept", data); 
  return { data: response.data, status: response.status };
};
//

const authService = {
  register,
  login,
  verification,
  forgotPassword,
  sendAccept
};

export default authService;
