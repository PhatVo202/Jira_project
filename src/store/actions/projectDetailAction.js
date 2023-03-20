import { SET_PROJECT_DETAIL } from "../types/projectDetailType";

export const setProjectDetailAction = (data) => {
  return {
    type: SET_PROJECT_DETAIL,
    payload: data,
  };
};
