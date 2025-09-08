import { fetchGetAllUserList, fetchGetUserApi } from '../../servers/user'

import { SET_USER_MANAGEMENT } from '../types/userManagementType'
import { DELETE_USER, FILTER_USER, UPDATE_USER } from '../types/userType'

export const setUserManagementAction = (data = '', id = '') => {
  return async (dispatch) => {
    const result = await fetchGetAllUserList()
    dispatch({
      type: SET_USER_MANAGEMENT,
      payload: result.data.content
    })

    dispatch({
      type: UPDATE_USER,
      payload: data
    })

    dispatch({
      type: DELETE_USER,
      payload: id
    })
  }
}

export const filterData = (keyword) => {
  return async (dispatch) => {
    const result = await fetchGetUserApi(keyword)
    dispatch({
      type: FILTER_USER,
      payload: result.data.content
    })
  }
}
