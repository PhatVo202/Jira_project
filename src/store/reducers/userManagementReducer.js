import { SET_USER_MANAGEMENT } from '../types/userManagementType'
import { DELETE_USER, FILTER_USER, UPDATE_USER } from '../types/userType'

const DEFAULT_STATE = {
  listUser: []
}

export const userManagementReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_USER_MANAGEMENT: {
      state.listUser = payload
      break
    }

    case UPDATE_USER: {
      state.listUser = state.listUser.map((item) => (item.userId === payload.userId ? payload : item))
      break
    }

    case DELETE_USER: {
      state.listUser = state.listUser.filter((item) => (item.userId === payload ? false : true))
      break
    }

    case FILTER_USER: {
      state.listUser = payload
      break
    }

    default:
      break
  }
  return { ...state }
}
