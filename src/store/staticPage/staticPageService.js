import axios from "axios";

const getPageSingle = async (url) => {
  const response = await axios.get(`/content/${url}`, {
    withCredentials: true,
  });
  return response.data;
};

const allPage = async () => {
  const response = await axios.get(`/content/all`);
  return response.data;
};

const pagesService = {
  getPageSingle,
  allPage
};

export default pagesService;
