import { axiosRequest } from '../configs/axios.config'

export const fetchStatusApi = async () => {
  return await axiosRequest({
    url: `/Status/getAll`,
    method: 'GET'
  })
}
