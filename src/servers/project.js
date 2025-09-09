import { axiosRequest } from '../configs/axios.config'

export const fetchAllProjectApi = async () => {
  return await axiosRequest({
    url: `/Project/getAllProject`,
    method: 'GET'
  })
}

export const fetchProjectKeyApi = async (keyword) => {
  return await axiosRequest({
    url: `/Project/getAllProject?keyword=${keyword}`,
    method: 'GET'
  })
}

export const fetchProjectDetailsApi = async (id) => {
  return await axiosRequest({
    url: `/Project/getProjectDetail?id=${id}`,
    method: 'GET'
  })
}

export const fetchProjectCategorylsApi = async () => {
  return await axiosRequest({
    url: `/ProjectCategory`,
    method: 'GET'
  })
}

export const createProjectAuthorizeApi = async (data) => {
  return await axiosRequest({
    url: `/Project/createProjectAuthorize`,
    method: 'POST',
    data: data
  })
}

export const deleteProjectApi = async (id) => {
  return await axiosRequest({
    url: `/Project/deleteProject?projectId=${id}`,
    method: 'DELETE'
  })
}

export const updateProjectApi = async (id, data) => {
  return await axiosRequest({
    url: `/Project/updateProject?projectId=${id}`,
    method: 'PUT',
    data: data
  })
}

export const getAssignUserProjectApi = async (data) => {
  return await axiosRequest({
    url: `/Project/assignUserProject`,
    method: 'POST',
    data: data
  })
}

export const removeUserFromProjectApi = async (data) => {
  return await axiosRequest({
    url: `/Project/removeUserFromProject`,
    method: 'POST',
    data: data
  })
}

export const createTaskApi = async (data) => {
  return await axiosRequest({
    url: `/Project/createTask`,
    method: 'POST',
    data: data
  })
}

export const fetchTaskDetailApi = async (id) => {
  return await axiosRequest({
    url: `/Project/getTaskDetail?taskId=${id}`,
    method: 'GET'
  })
}

export const removeTaskApi = async (id) => {
  return await axiosRequest({
    url: `/Project/removeTask?taskId=${id}`,
    method: 'DELETE'
  })
}

//update Task
export const updatePriorityApi = async (data) => {
  return await axiosRequest({
    url: '/Project/updatePriority',
    method: 'PUT',
    data: data
  })
}

export const updateAssignUserTaskApi = async (data) => {
  return await axiosRequest({
    url: '/Project/assignUserTask',
    method: 'POST',
    data: data
  })
}

export const updateEstimateApi = async (data) => {
  return await axiosRequest({
    url: '/Project/updateEstimate',
    method: 'PUT',
    data: data
  })
}

export const updateTimeTrackingApi = async (data) => {
  return await axiosRequest({
    url: '/Project/updateTimeTracking',
    method: 'PUT',
    data: data
  })
}

export const updateStatusApi = async (data) => {
  return await axiosRequest({
    url: '/Project/updateStatus',
    method: 'PUT',
    data: data
  })
}

export const updateDescriptionApi = async (data) => {
  return await axiosRequest({
    url: '/Project/updateDescription',
    method: 'PUT',
    data: data
  })
}

export const updateTaskApi = async (data) => {
  return await axiosRequest({
    url: '/Project/updateTask',
    method: 'POST',
    data: data
  })
}
