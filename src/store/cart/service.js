import axios from "axios";

const getCart = async () => {
    const response = await axios.get("cart");
    return response?.data?.data;
};
const addProduct = async ( data ) => {
    const response = await axios.post('cart/add', data)
    return response.data
}

const updateProduct = async ( data ) => {
    const response = await axios.post('cart/update', data)
    return response.data
}

const cartService = {
    getCart,
    addProduct,
    updateProduct
}

export default cartService