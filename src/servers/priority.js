import { axiosRequest } from '../configs/axios.config'

export const fetchPriorityApi = () => {
  return axiosRequest({
    url: `/Priority/getAll?id=32`,
    method: 'GET'
  })
}
