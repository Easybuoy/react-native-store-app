import { API_KEY } from "react-native-dotenv";
import AsyncStorage from "@react-native-community/async-storage";

import { SIGN_UP, SIGN_IN, LOGOUT, RESTORE_TOKEN } from "../types";

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
      dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const restoreToken = () => {
  return async (dispatch) => {
    let token;
    let userId;
    try {
      token = await AsyncStorage.getItem("userToken");
      userId = await AsyncStorage.getItem("userId");
    } catch (error) {
      token = null;
      userId = null;
    }
    dispatch({
      type: RESTORE_TOKEN,
      userToken: token,
      userId,
    });
  };
};

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

      await AsyncStorage.setItem("userToken", resData.idToken);
      await AsyncStorage.setItem("userId", resData.localId);

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

      await AsyncStorage.setItem("userToken", resData.idToken);
      await AsyncStorage.setItem("userId", resData.localId);

      dispatch({
        type: SIGN_IN,
        userToken: resData.idToken,
        userId: resData.localId,
      });
    } catch (error) {
      throw error;
    }
  };
};
