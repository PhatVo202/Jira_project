import { notification } from "antd";
import { data } from "jquery";
import {
  ADD_MEMBER_BOARD,
  DELETE_COMMENT,
  DELETE_MEMBER_PROJECT,
  DELETE_PROJECT,
  EDIT_COMMENT,
  FILTER_PROJECT,
  GET_ALL_MEMBER,
  GET_ALL_PROJECT,
  GET_USER_BY_PROJECTID,
  INSERT_COMMENT,
  REMOVE_MEMBER_BOARD,
  REMOVE_TASK,
  SEARCH_MEMBER_BOARD,
  SET_COMMENT_ALL,
  SET_DESCRIPTION,
  SET_MEMBER_INFO,
  SET_PROJECT_DETAIL,
  SET_PROJECT_DETAIL_ARR,
  SET_PROJECT_LIST,
  SET_TASKDETAIL,
} from "../types/projectDetailType";

const DEFAULT_STATE = {
  projectList: [],
  member: [],

  projectDetail: [],

  arrMember: [],

  arrProject: [],

  taskDetail: {},
  commentList: [],
};

export const projectDetailReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
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

    case ADD_MEMBER_BOARD: {
      const data = [...state.projectDetail.members];

      const index = data.findIndex((item) => item.userId === payload.userId);

      if (index !== -1) {
        notification.error({
          message: "User đã được thêm rồi!",
        });
      } else {
        data.push(...payload.members);
      }
      state.projectDetail.members = data;
      console.log(state.projectDetail.members);
      break;
    }

    case DELETE_MEMBER_PROJECT: {
      const dataUpdate = [...state.projectList];
      const index = dataUpdate.findIndex(
        (item) => item.id === payload.projectId
      );

      const arrMembers = dataUpdate[index].members;
      const idxMembers = arrMembers.findIndex(
        (member) => member.userId === payload.userId
      );
      arrMembers.splice(idxMembers, 1);
      break;
    }

    case REMOVE_MEMBER_BOARD: {
      state.projectDetail.members = state.projectDetail.members.filter((item) =>
        item.userId === payload ? false : true
      );
      break;
    }

    case SEARCH_MEMBER_BOARD: {
      state.arrMember = payload;

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

    case SET_PROJECT_DETAIL_ARR: {
      state.projectDetail = payload;
      break;
    }

    case SET_TASKDETAIL: {
      state.taskDetail = payload;
      break;
    }

    case "SET_TASKDETAIL": {
      state.taskDetail = payload;
      break;
    }

    case SET_COMMENT_ALL: {
      state.commentList = payload;
      break;
    }

    case INSERT_COMMENT: {
      const dataUpdate = [...state.commentList];
      dataUpdate.push(payload);
      state.commentList = dataUpdate;
      break;
    }

    case EDIT_COMMENT: {
      const dataUpdate = [...state.commentList];
      const index = dataUpdate.findIndex((item) => item.id === payload.id);

      dataUpdate[index].contentComment = payload.content;
    }

    case DELETE_COMMENT: {
      state.commentList = state.commentList.filter((item) =>
        item.id === payload ? false : true
      );
      break;
    }

    case SET_DESCRIPTION: {
      state.taskDetail.description = payload;
      break;
    }

    default:
      break;
  }
  return { ...state };
};
