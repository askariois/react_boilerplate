// userService.js
import axios from "axios";

const cityGet = async () => {
  const response = await axios.get("cities");
  return { data: response.data, status: response.status };
};


const cityService = {
  cityGet,
};

export default cityService;
