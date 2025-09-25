import axios from "axios";

const getFavorites = async () => {
    const response = await axios.get(`products/favorites`);
    return response.data;
};

const addFavorites = async ( product ) => {
    const response = await axios.post(`products/favorites/add`, product);
    return response.data;
};

const removeFavorites = async ( product ) => {
    const response = await axios.post(`products/favorites/remove`, product);
    return response.data;
};

const favoriteService = {
    getFavorites,
    addFavorites,
    removeFavorites
}

export default favoriteService