// userService.js
import axios from "axios";

const streetGet = async (data) => {
  const response = await axios.get(
    `/streets?name=${data.name}&cityId=${data.cityId}`
  );
  return { data: response.data, status: response.status };
};
const lastAddressGet = async () => {
  const response = await axios.get(`/user/addresses`);
  return { data: response.data, status: response.status };
};

const pickupAddressGet = async (data) => {
  const response = await axios.get(`/streets/pickup/?cityId=${data.cityId}`);
  return { data: response.data, status: response.status };
};

const fromCoordsGet = async (data) => {
  const response = await axios.get(
    `/branches/fromCoords?lat=${data.lat}&lon=${data.lon}`
  );
  return { data: response.data, status: response.status };
};

// export const saveAddress = createAsyncThunk(
//   "street/saveAddress",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/addresses", data);
//       return { data: response.data, status: response.status };
//     } catch (error) {
//       return rejectWithValue({
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//     }
//   }
// );

const streetService = {
  streetGet,
  lastAddressGet,
  pickupAddressGet,
  fromCoordsGet,
};

export default streetService;
