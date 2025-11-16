import axios from "axios";
import Cookies from "js-cookie";
// import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 30000,
  withCredentials: true,
});

console.log("BASE_URL", import.meta.env.VITE_SERVER_URL);

// console.log("========================", apiClient);

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token") || Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     //note: check if data is not an instance of FormData
//     const isFormData = config.data instanceof FormData;
//     if (!isFormData) {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (err) => {
//     console.error("API Request Error: ", err);
//     return Promise.reject(err);
//   }
// );

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log("API Response Error: ", err);
    return Promise.reject(err);
  }
);

export const apiCall = async ({
  method,
  url,
  data = null,
  params = null,
  headers = {},
}) => {
  // console.log(
  //   "🚀 CALLED apiCall WITH url =",
  //   url,
  //   typeof url,
  //   "method =",
  //   method
  // );

  if (!url) {
    console.error("No url provided");
    return { success: false, message: "No url provided" };
  }
  if (!method) {
    console.error("No method provided");
    return { success: false, message: "No method provided" };
  }

  const isFormData = data instanceof FormData;

  try {
    const response = await apiClient({
      method: method.toLowerCase(),
      url,
      data,
      params,
      headers: {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...headers,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export default apiClient;
