import axios from "axios";

const getCategories = async () => {
    const response = await axios.get('categories')
    return response.data
}

const getProductsByCategoryId = async ( data ) => {
    const response = await axios.get(`products`, {
        params : data
    })
    return response.data
}

const getSingleProduct = async ( url ) => {
    const response = await axios.get(`product/${url}`)
    return response.data
}

const catalog = {
    getCategories,
    getProductsByCategoryId,
    getSingleProduct
}
export default catalog