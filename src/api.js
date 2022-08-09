import axios from "axios";

const api = axios.create({
  baseURL: "https://exchange-rates.abstractapi.com/v1",
  
});
export default api;

