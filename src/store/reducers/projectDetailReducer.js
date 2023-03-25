import { data } from "jquery";
import {
  DELETE_PROJECT,
  FILTER_PROJECT,
  GET_ALL_MEMBER,
  GET_ALL_PROJECT,
  GET_USER_BY_PROJECTID,
  SET_MEMBER_INFO,
  SET_PROJECT_DETAIL,
  SET_PROJECT_LIST,
} from "../types/projectDetailType";

const DEFAULT_STATE = {
  projectInfo: {},
  projectList: [],
  member: [],

  arrMember: [],

  arrProject: [],
};

export const projectDetailReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROJECT_DETAIL: {
      state.projectInfo = payload;
      break;
    }

    case SET_PROJECT_LIST: {
      state.projectList = payload;
      break;
    }

    case DELETE_PROJECT: {
      state.projectList = state.projectList.filter((item) =>
        item.id === payload ? false : true
      );
      break;
    }

    case FILTER_PROJECT: {
      state.projectList = payload;
      break;
    }

    case SET_MEMBER_INFO: {
      const dataUpdate = [...state.projectList];
      const index = dataUpdate.findIndex(
        (item) => item.id === payload.projectId
      );
      dataUpdate[index].members.push(...payload.members);
      state.projectList = dataUpdate;
      break;
    }

    case GET_ALL_PROJECT: {
      state.arrProject = payload;
      break;
    }

    case GET_ALL_MEMBER: {
      state.arrMember = payload;
      break;
    }
    case GET_USER_BY_PROJECTID: {
      state.arrMember = payload;
      break;
    }

    default:
      break;
  }
  return { ...state };
};
