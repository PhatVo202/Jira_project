import { SET_PROJECT_DETAIL } from "../types/projectDetailType";

const DEFAULT_STATE = {
  projectInfo: {},
};

export const projectDetailReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROJECT_DETAIL: {
      state.projectInfo = payload;
      break;
    }

    default:
      break;
  }
  return { ...state };
};
