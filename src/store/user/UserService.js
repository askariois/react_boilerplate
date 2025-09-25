// userService.js
import axios from "axios";

const userSingle = async () => {
  const response = await axios.get("user", {
    withCredentials: true,
  });
  return { data: response.data, status: response.status };
};

const updateUser = async (data) => {
  const response = await axios.post("/setUser", data, {
    withCredentials: true,
  });
  return response;
};

const userService = {
  userSingle,
  updateUser,
};

export default userService;
