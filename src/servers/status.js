import { axiosRequest } from '../configs/axios.config'

export const fetchStatusApi = () => {
  return axiosRequest({
    url: `/Status/getAll`,
    method: 'GET'
  })
}
