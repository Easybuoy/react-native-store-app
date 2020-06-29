import { SIGN_IN, SIGN_UP } from "../types";
const INITIAL_STATE = {
  token: null,
  userId: null,
  isSignedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        token: action.token,
        userId: action.userId,
        isSignedIn: true
      };
    case SIGN_IN:
      return {
        token: action.token,
        userId: action.userId,
        isSignedIn: true
      };
    default:
      return state;
  }
};
