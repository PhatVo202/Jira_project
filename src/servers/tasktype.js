import { axiosRequest } from '../configs/axios.config'

export const fetchTaskTypeApi = async () => {
  return await axiosRequest({
    url: `/TaskType/getAll`,
    method: 'GET'
  })
}
