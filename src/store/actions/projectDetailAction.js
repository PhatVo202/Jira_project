import {
  fetchAllProjectApi,
  fetchProjectKeyApi,
  getAssignUserProjectApi,
} from "../../servers/project";
import { fetchGetUserApi, getUserProjectIdApi } from "../../servers/user";
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

export const setProjectDetailAction = (data) => {
  return {
    type: SET_PROJECT_DETAIL,
    payload: data,
  };
};

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

export const fiterProjectAction = (keyword) => {
  return async (dispatch) => {
    const result = await fetchProjectKeyApi((keyword = ""));

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

//delete Member
export const deleteMemberAction = () => {};

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
