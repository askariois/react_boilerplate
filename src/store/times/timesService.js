// userService.js
import axios from "axios";

const timesGet = async (data) => {
  const response = await axios.get(`/cart/times?streetId=${data.streetId}`);
  return { data: response.data, status: response.status };
};

const timesService = {
  timesGet,
};

export default timesService;
