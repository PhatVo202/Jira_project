import { axiosRequest } from "../configs/axios.config";

export const fetchAllCommentApi = (id) => {
  return axiosRequest({
    url: `/Comment/getAll?taskId=${id}`,
    method: "GET",
  });
};

export const insertCommentApi = (data) => {
  return axiosRequest({
    url: `/Comment/insertComment`,
    method: "POST",
    data: data,
  });
};

export const updateCommentApi = (id, content) => {
  return axiosRequest({
    url: `/Comment/updateComment?id=${id}&contentComment=${content}`,
    method: "PUT",
  });
};

export const deleteCommentApi = (id) => {
  return axiosRequest({
    url: `/Comment/deleteComment?idComment=${id}`,
    method: "DELETE",
  });
};
