import axios from "axios";
import { api } from "./urlConfig";

const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    ["x-access-token" || "authorization"]: token ? token : "",
    // Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosInstance;
