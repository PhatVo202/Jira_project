import { axiosRequest } from '../configs/axios.config'

export const fetchAllCommentApi = async (id) => {
  return await axiosRequest({
    url: `/Comment/getAll?taskId=${id}`,
    method: 'GET'
  })
}

export const insertCommentApi = async (data) => {
  return await axiosRequest({
    url: `/Comment/insertComment`,
    method: 'POST',
    data: data
  })
}

export const updateCommentApi = async (id, content) => {
  return await axiosRequest({
    url: `/Comment/updateComment?id=${id}&contentComment=${content}`,
    method: 'PUT'
  })
}

export const deleteCommentApi = async (id) => {
  return await axiosRequest({
    url: `/Comment/deleteComment?idComment=${id}`,
    method: 'DELETE'
  })
}
