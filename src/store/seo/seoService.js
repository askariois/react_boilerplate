import axios from "axios";


const seo = async (data) => {
  const response = await axios.get(`/seo-meta`, {
   params: data
  });
  return response.data;
};

const seoService = {
  seo
};

export default seoService;
