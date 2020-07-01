import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { AuthContext } from "./components/Context";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { API_KEY } from "react-native-dotenv";
import { Alert } from "react-native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-community/async-storage";

import { SIGN_IN, SIGN_UP, RESTORE_TOKEN, LOGOUT } from "./store/types";
import { MyDrawer, AuthNavigator } from "./navigation/Navigator";
import store from "./store";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const fetchUserToken = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem("userToken");
      } catch (error) {
        token = null;
      }

      dispatch({
        type: RESTORE_TOKEN,
        token,
      });
    };

    fetchUserToken();
  }, []);

  const INITIAL_STATE = {
    isLoading: true,
    userToken: null,
    userId: null,
  };

  const loginReducer = (prevState, action) => {
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

  const [loginState, dispatch] = React.useReducer(loginReducer, INITIAL_STATE);

  const authContext = React.useMemo(() => ({
    signIn: async (email, password) => {
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
        dispatch({
          type: SIGN_IN,
          token: resData.idToken,
          userId: resData.localId,
        });
      } catch (error) {
        throw error;
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
        dispatch({
          type: LOGOUT,
        });
      } catch (error) {
        Alert.alert("An error occured", "Unable to Logout", [
          { text: "Cancel" },
        ]);
      }
    },
    signUp: async (email, password) => {
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

        dispatch({
          type: SIGN_UP,
          token: resData.idToken,
          userId: resData.localId,
        });
      } catch (error) {
        throw error;
      }
    },
  }));

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Provider store={store}>
          {loginState.userToken !== null ? <MyDrawer /> : <AuthNavigator />}
        </Provider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
