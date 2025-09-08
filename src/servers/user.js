import { axiosRequest } from '../configs/axios.config'

export const loginApi = async (information) => {
  return await axiosRequest({
    url: '/Users/signin',
    method: 'POST',
    data: information
  })
}

export const registerApi = async (information) => {
  return axiosRequest({
    url: '/Users/signup',
    method: 'POST',
    data: information
  })
}

export const getUserProjectIdApi = async (id) => {
  return await axiosRequest({
    url: `/Users/getUserByProjectId?idProject=${id}`,
    method: 'GET'
  })
}

export const fetchGetUserApi = async (key) => {
  return await axiosRequest({
    url: `/Users/getUser?keyword=${key}`, //id
    method: 'GET'
  })
}

export const fetchGetAllUserList = async () => {
  return await axiosRequest({
    url: `/Users/getUser`, //id
    method: 'GET'
  })
}

export const editUser = async (data) => {
  return await axiosRequest({
    url: `/Users/editUser`, //id
    method: 'PUT',
    data: data
  })
}

export const deleteUser = async (id) => {
  return await axiosRequest({
    url: `/Users/deleteUser?id=${id}`, //id
    method: 'DELETE'
  })
}
