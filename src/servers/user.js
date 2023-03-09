import { axiosRequest } from "../configs/axios.config";

export const loginApi = () => {
  return axiosRequest({
    url: "/Users/signin",
    method: "POST",
  });
};

export const registerApi = (information) => {
  return axiosRequest({
    url: "/Users/signup",
    method: "POST",
    data: information,
  });
};
