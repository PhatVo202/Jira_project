import { SET_USER_INFO } from "../types/userType";

const DEFAULT_STATE = {
  userInfo: null,
};

if (localStorage.getItem("USER_INFO_KEY")) {
  DEFAULT_STATE.userInfo = JSON.parse(localStorage.getItem("USER_INFO_KEY"));
}

export const userReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_INFO: {
      state.userInfo = payload;
      break;
    }

    default:
      break;
  }
  return { ...state };
};
