import axios from "axios";

export const apiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiAxios.interceptors.request.use(
  (config) => {
    let querySearch = {};
    config.params = querySearch;

    return config;
  },
  (error) => Promise.reject(error)
);
