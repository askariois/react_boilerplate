// export default checkBillService.js
import axios from "axios";

const checkBill = async (data) => {
  const response = await axios.post("/cart/final", data);
  return { data: response.data, status: response.status };
};

const checkBillService = {
  checkBill,
};

export default checkBillService;
