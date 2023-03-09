import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants";

const axiosRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

axiosRequest.interceptors.request.use((config) => {
  if (localStorage.getItem("USER_INFO_KEY")) {
    const userInfo = JSON.parse(localStorage.getItem("USER_INFO_KEY"));
    const accessToken = userInfo.accessToken;

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export { axiosRequest };
