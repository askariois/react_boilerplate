import axios from "axios";

const getActions = async () => {
  const response = await axios.get(`/actions`, {
    withCredentials: true,
  });
  return response.data;
};

const singleAction = async (data) => {
  const response = await axios.get(`/action`, {
   params: data
  });
  return response.data;
};


const actionSlice = {
  getActions,
  singleAction
};

export default actionSlice;
