import { API_KEY } from "react-native-dotenv";

import { SIGN_UP, SIGN_IN } from "../types";

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();

        const errorId = errorResponse.error.message;
        let message = "Something went wrong";
        if (errorId === "EMAIL_EXISTS") {
          message = "Email Exists Already";
        }
        throw new Error(message);
      }

      const resData = await response.json();
      console.log(resData);
      dispatch({
        type: SIGN_UP,
        token: resData.idToken,
        userId: resData.localId,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();

        const errorId = errorResponse.error.message;
        let message = "Something went wrong";
        if (errorId === "EMAIL_NOT_FOUND") {
          message = "Email Not Found";
        } else if (errorId === "INVALID_PASSWORD") {
          message = "Password not valid";
        }
        throw new Error(message);
      }

      const resData = await response.json();
      console.log(resData);
      dispatch({
        type: SIGN_IN,
        token: resData.idToken,
        userId: resData.localId,
      });
    } catch (error) {
      console.log(error, "err");
      throw error;
    }
  };
};
