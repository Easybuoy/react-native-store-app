import { SIGN_IN, SIGN_UP, RESTORE_TOKEN, LOGOUT } from "../types";

const INITIAL_STATE = {
  isLoading: true,
  userToken: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.userToken,
        userId: action.userId,
        isLoading: false,
      };
    case SIGN_UP:
      return {
        ...state,
        userToken: action.userToken,
        userId: action.userId,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...state,
        userToken: action.userToken,
        userId: action.userId,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        userToken: null,
        userId: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
