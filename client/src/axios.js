import axios from "axios";
import { api } from "./urlConfig";

// const token = localStorage.getItem("token");
// console.log("token", token);
// function getHeaders() {
//   if (token) {
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   }
// }

const axiosInstance = axios.create({
  baseURL: api,

  // ...getHeaders(),
});

// const baseURL = api;
// const axiosInstance = axios.interceptors.request.use(
//   (config) => {
//     const { original } = new URL(config.url);
//     const allowedOrigins = [baseURL];
//     const token = localStorage.getItem("token");
//     console.log("tok", token);
//     if (allowedOrigins.includes(original)) {
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
