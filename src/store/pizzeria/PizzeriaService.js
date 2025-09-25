import axios from "axios";

const getPizzeria = async (pizzeriaId) => {
  const response = await axios.get(`/cafes?city_id=${pizzeriaId}`, {
    withCredentials: true,
  });
  return response.data;
};

const pizzeriaSlice = {
  getPizzeria,
};

export default pizzeriaSlice;
