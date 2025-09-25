import axios from "axios";

const getBranches = async (query) => {
    const response = await axios.get(`branches/?${query}`)
    return response.data
}

const branchesService = {
    getBranches,
}
export default branchesService