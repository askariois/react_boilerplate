import axios from "axios";

export const getRecommendations = async ( url ) => {
    const urlData = url.url
    const response = await axios.get(`product/${urlData}/recommended`);
    return response.data;
};
