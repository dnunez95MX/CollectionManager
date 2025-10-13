import axios from "axios";

const axios_instance = axios.create({
  // baseURL: process.env.REACT_APP_API_HOST,
  baseURL: import.meta.env.VITE_APP_API_HOST,
  timeout: 1000000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axios_instance;
