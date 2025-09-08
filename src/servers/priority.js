import { axiosRequest } from '../configs/axios.config'

export const fetchPriorityApi = async () => {
  return await axiosRequest({
    url: `/Priority/getAll?id=32`,
    method: 'GET'
  })
}
