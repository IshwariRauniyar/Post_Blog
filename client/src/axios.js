import axios from "axios";
import { api } from "./urlConfig";

// if (localStorage.getItem("token")) {
//   axios.defaults.headers.common["Authorization"] = localStorage.getItem(
//     "token"
//   );
// }

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = token;
console.log("tok", token);
// if (token !== null) {
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    // ["x-access-token" || "authorization"]: token ? token : "",
    Authorization: token ? `Bearer ${token}` : "",
  },
});
// }

export default axiosInstance;
