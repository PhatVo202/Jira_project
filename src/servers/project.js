import { axiosRequest } from "../configs/axios.config";

export const fetchAllProjectApi = () => {
  return axiosRequest({
    url: `/Project/getAllProject`,
    method: "GET",
    // ?keyword=1
  });
};

export const fetchProjectDetailsApi = (id) => {
  return axiosRequest({
    url: `/Project/getProjectDetail?id=${id}`,
    method: "GET",
  });
};

export const fetchProjectCategorylsApi = () => {
  return axiosRequest({
    url: `/ProjectCategory`,
    method: "GET",
  });
};

export const createProjectAuthorizeApi = (data) => {
  return axiosRequest({
    url: `/Project/createProjectAuthorize`,
    method: "POST",
    data: data,
  });
};

export const deleteProjectApi = (id) => {
  return axiosRequest({
    url: `/Project/deleteProject?projectId=${id}`,
    method: "DELETE",
  });
};

export const updateProjectApi = (id, data) => {
  return axiosRequest({
    url: `/Project/updateProject?projectId=${id}`,
    method: "PUT",
    data: data,
  });
};

export const getAssignUserProjectApi = (data) => {
  return axiosRequest({
    url: `/Project/assignUserProject`,
    method: "POST",
    data: data,
  });
};

export const removeUserFromProjectApi = (data) => {
  return axiosRequest({
    url: `/Project/removeUserFromProject`,
    method: "POST",
    data: data,
  });
};
