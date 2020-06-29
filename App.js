import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { AuthContext } from "./components/Context";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { MyDrawer, AuthNavigator, Navigator } from "./navigation/Navigator";
import store from "./store";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
export default function App() {
  // const [userToken, setUserToken] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  // console.log(userToken)

  const INITIAL_STATE = {
    isLoading: true,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RESTORE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "SIGN_UP":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "SIGN_IN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, INITIAL_STATE);
  const authContext = React.useMemo(() => ({
    signIn: async (email, password) => {
      console.log("aa");
      // setUserToken("aaaa");
      // setIsLoading(false);
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAW-E4qcm4V9btF-60CKhVQCtgEgoaD7DM",
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
          type: "SIGN_IN",
          token: resData.idToken,
          userId: resData.localId,
        });
      } catch (error) {
        throw error;
      }
    },
    signOut: () => {
      console.log("ye");
      dispatch({
        type: "LOGOUT",
      });
    },
    signUp: () => {
      setUserToken("aaaa");
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      //
      dispatch({
        type: "RESTORE_TOKEN",
        token: "resData.idToken",
      });
    }, 1000);
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  if (loginState.isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Provider store={store}>
        <NavigationContainer>
          {loginState.userToken !== null ? <MyDrawer /> : <AuthNavigator />}
          {/* {isSignedIn ? <MyDrawer /> : <AuthNavigator />} */}
          {/* <MyDrawer /> */}
          {/* <AuthNavigator /> */}
          {/* <Navigator /> */}
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
}
