import axios from "axios";
import { api } from "./urlConfig";

const axiosInstance = axios.create({
  baseURL: api,
  withCredentials: true,
});


export default axiosInstance;
