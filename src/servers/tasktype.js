import { axiosRequest } from "../configs/axios.config";

export const fetchTaskTypeApi = () => {
  return axiosRequest({
    url: `/TaskType/getAll`,
    method: "GET",
  });
};
