// userService.js
import axios from "axios";

const loyalityGet = async () => {
  const response = await axios.get(`/user/loyality`);
  return { data: response.data, status: response.status };
};

const loyalityService = {
  loyalityGet,
};

export default loyalityService;
