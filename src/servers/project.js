import { axiosRequest } from "../configs/axios.config";

export const fetchAllProjectApi = () => {
  return axiosRequest({
    url: `/Project/getAllProject`,
    method: "GET",
    // ?keyword=1
  });
};

export const fetchProjectKeyApi = (keyword) => {
  return axiosRequest({
    url: `/Project/getAllProject?keyword=${keyword}`,
    method: "GET",
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

export const createTaskApi = (data) => {
  return axiosRequest({
    url: `/Project/createTask`,
    method: "POST",
    data: data,
  });
};

export const fetchTaskDetailApi = (id) => {
  return axiosRequest({
    url: `/Project/getTaskDetail?taskId=${id}`,
    method: "GET",
  });
};

export const removeTaskApi = (id) => {
  return axiosRequest({
    url: `/Project/removeTask?taskId=${id}`,
    method: "DELETE",
  });
};

//update Task
export const updatePriorityApi = (data) => {
  return axiosRequest({
    url: "/Project/updatePriority",
    method: "PUT",
    data: data,
  });
};

export const updateAssignUserTaskApi = (data) => {
  return axiosRequest({
    url: "/Project/assignUserTask",
    method: "POST",
    data: data,
  });
};

export const updateEstimate = (data) => {
  return axiosRequest({
    url: "/Project/updateEstimate",
    method: "PUT",
    data: data,
  });
};

export const updateTimeTracking = (data) => {
  return axiosRequest({
    url: "/Project/updateTimeTracking",
    method: "PUT",
    data: data,
  });
};

export const updateStatus = (data) => {
  return axiosRequest({
    url: "/Project/updateStatus",
    method: "PUT",
    data: data,
  });
};
