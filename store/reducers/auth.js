import { SIGN_IN, SIGN_UP, RESTORE_TOKEN, LOGOUT } from "../types";

const INITIAL_STATE = {
  isLoading: true,
  userToken: null,
  userId: null,
};

const authReducer = (prevState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case SIGN_UP:
      return {
        ...prevState,
        userToken: action.token,
        userId: action.userId,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...prevState,
        userToken: action.token,
        userId: action.userId,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...prevState,
        userToken: null,
        userId: null,
        isLoading: false,
      };
  }
};

export { INITIAL_STATE, authReducer };
