import { axiosRequest } from "../configs/axios.config";

export const loginApi = (information) => {
  return axiosRequest({
    url: "/Users/signin",
    method: "POST",
    data: information,
  });
};

export const registerApi = (information) => {
  return axiosRequest({
    url: "/Users/signup",
    method: "POST",
    data: information,
  });
};

export const getUserProjectIdApi = (id) => {
  return axiosRequest({
    url: `/Users/getUserByProjectId?idProject=${id}`,
    method: "GET",
  });
};

export const fetchGetUserApi = (key) => {
  return axiosRequest({
    url: `/Users/getUser?keyword=${key}`, //id
    method: "GET",
  });
};

export const fetchGetAllUserList = () => {
  return axiosRequest({
    url: `/Users/getUser`, //id
    method: "GET",
  });
};

export const editUser = (data) => {
  return axiosRequest({
    url: `/Users/editUser`, //id
    method: "PUT",
    data: data,
  });
};

export const deleteUser = (id) => {
  return axiosRequest({
    url: `/Users/deleteUser?id=${id}`, //id
    method: "DELETE",
  });
};
