import axios from "axios";
import { api } from "./urlConfig";

// if (localStorage.getItem("token")) {
//   axios.defaults.headers.common["Authorization"] = localStorage.getItem(
//     "token"
//   );
// }

const token = localStorage.getItem("token");
console.log("token", token);
function getHeaders() {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
}
// axios.defaults.headers.common["Authorization"] = token;
// console.log("tok", token);
// if (token !== null) {
const axiosInstance = axios.create({
  baseURL: api,
  // token: localStorage.getItem("token"),

  ...getHeaders(),
});

console.log("axios", axiosInstance);
// }

// const url = axios.create({
//   baseURL: api,
// });

// const axiosInstance = url.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     console.log("tok", token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// console.log("axios", url.baseURL);

export default axiosInstance;
