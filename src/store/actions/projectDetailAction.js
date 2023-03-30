import { fetchAllCommentApi, insertCommentApi } from "../../servers/comment";
import {
  fetchAllProjectApi,
  fetchProjectKeyApi,
  fetchProjectDetailsApi,
  fetchTaskDetailApi,
} from "../../servers/project";
import { fetchGetUserApi, getUserProjectIdApi } from "../../servers/user";
import {
  ADD_MEMBER_BOARD,
  DELETE_COMMENT,
  DELETE_MEMBER_PROJECT,
  DELETE_PROJECT,
  FILTER_PROJECT,
  GET_ALL_MEMBER,
  GET_ALL_PROJECT,
  GET_USER_BY_PROJECTID,
  INSERT_COMMENT,
  REMOVE_MEMBER_BOARD,
  SEARCH_MEMBER_BOARD,
  SET_COMMENT_ALL,
  SET_MEMBER_INFO,
  SET_PROJECT_DETAIL_ARR,
  SET_PROJECT_LIST,
  SET_TASKDETAIL,
} from "../types/projectDetailType";

export const setProjectListAction = () => {
  return async (dispatch) => {
    const result = await fetchAllProjectApi();
    dispatch({
      type: SET_PROJECT_LIST,
      payload: result.data.content,
    });
  };
};

export const deleteProjectAction = (id) => {
  return {
    type: DELETE_PROJECT,
    payload: id,
  };
};

export const filterProjectAction = (keyword = "") => {
  return async (dispatch) => {
    const result = await fetchProjectKeyApi(keyword);

    dispatch({
      type: FILTER_PROJECT,
      payload: result.data.content,
    });
  };
};

//add Member
export const setMemberInfoAction = (keyword, projectId) => {
  return async (dispatch) => {
    const result = await fetchGetUserApi(keyword);
    console.log(result);

    dispatch({
      type: SET_MEMBER_INFO,
      payload: {
        members: result.data.content,
        projectId: projectId,
      },
    });
  };
};

//add Member Board
export const setMemberBoardAction = (id, userId) => {
  return async (dispatch) => {
    const result = await fetchGetUserApi(id);

    dispatch({
      type: ADD_MEMBER_BOARD,
      payload: {
        members: result.data.content,
        userId: userId,
      },
    });
  };
};

//delete Member
export const deleteMemberAction = (projectId, userId) => {
  return {
    type: DELETE_MEMBER_PROJECT,
    payload: {
      projectId: projectId,
      userId: userId,
    },
  };
};

//delete Member board
export const removeMemberBoard = (userId) => {
  return {
    type: REMOVE_MEMBER_BOARD,
    payload: userId,
  };
};

export const setArrProjectAll = () => {
  return async (dispatch) => {
    const result = await fetchAllProjectApi();
    dispatch({
      type: GET_ALL_PROJECT,
      payload: result.data.content,
    });
  };
};

export const getAllMember = (keyword) => {
  return async (dispatch) => {
    const result = await fetchGetUserApi(keyword);
    dispatch({
      type: GET_ALL_MEMBER,
      payload: result.data.content,
    });
  };
};

export const getMemberByProjectId = (projectId) => {
  return async (dispatch) => {
    const result = await getUserProjectIdApi(projectId);
    dispatch({
      type: GET_USER_BY_PROJECTID,
      payload: result.data.content,
    });
  };
};

export const setProjectDetailArrAction = (id) => {
  return async (dispatch) => {
    const result = await fetchProjectDetailsApi(id);
    dispatch({
      type: SET_PROJECT_DETAIL_ARR,
      payload: result.data.content,
    });
  };
};

//search Members Board

export const searchMemberBoard = (keyword) => {
  return async (dispatch) => {
    const result = await fetchGetUserApi(keyword);
    dispatch({
      type: SEARCH_MEMBER_BOARD,
      payload: result.data.content,
    });
  };
};

export const setTaskDetail = (id) => {
  return async (dispatch) => {
    const result = await fetchTaskDetailApi(id);
    dispatch({
      type: SET_TASKDETAIL,
      payload: result.data.content,
    });
  };
};

//COMMENT
export const setAllComment = (taskId) => {
  return async (dispatch) => {
    const result = await fetchAllCommentApi(taskId);
    dispatch({
      type: SET_COMMENT_ALL,
      payload: result.data.content,
    });
  };
};

export const inserCommentAction = (data) => {
  return async (dispatch) => {
    const result = await insertCommentApi(data);
    dispatch({
      type: INSERT_COMMENT,
      payload: result.data.content,
    });
  };
};

export const deleteCommentAction = (id) => {
  return {
    type: DELETE_COMMENT,
    payload: id,
  };
};
