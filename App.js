import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { AuthContext } from "./components/Context";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { API_KEY } from "react-native-dotenv";
import { Alert } from "react-native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-community/async-storage";

import authReducer from "./store/reducers/auth";
import { signup, login, logout } from "./store/actions/auth";
import { SIGN_IN, SIGN_UP, RESTORE_TOKEN, LOGOUT } from "./store/types";
import { MyDrawer, AuthNavigator } from "./navigation/Navigator";
import store from "./store";

import Root from './Root'

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  // const [token, setToken] = useState(null);
  // const [loginState, dispatch] = React.useReducer(authReducer);

  // const orders = useSelector((state) => state.orders.orders);
  // console.log(orders);

  // console.log(store.getState().auth);
  // useEffect(() => {
  //   const fetchUserToken = async () => {
  //     let token;
  //     let userId;
  //     try {
  //       token = await AsyncStorage.getItem("userToken");
  //       userId = await AsyncStorage.getItem("userId");
  //       setToken(store.getState().auth.userToken);
  //     } catch (error) {
  //       console.log("gboe");
  //       token = null;
  //       userId = null;
  //     }

  //     await store.dispatch({
  //       type: RESTORE_TOKEN,
  //       userToken: token,
  //       userId,
  //     });
  //   };
  //   console.log("firing");
  //   // const unsubscribe = store.subscribe(() => {
  //   //   setToken(store.getState().auth.userToken);
  //   //   console.log(store.getState().auth, "sssss");
  //   // });
  //   fetchUserToken();
  // }, [store.getState().auth]);

  // console.log(token, "ttt");
  // const authContext = React.useMemo(() => ({
  //   signIn: async (email, password) => {
  //     await store.dispatch(login(email, password));
  //     // dispatch(login(email, password));
  //   },
  //   signOut: async () => {
  //     try {
  //       await AsyncStorage.removeItem("userToken");
  //       await AsyncStorage.removeItem("userId");
  //       console.log("aaa");
  //       await store.dispatch({
  //         type: LOGOUT,
  //       });
  //     } catch (error) {
  //       Alert.alert("An error occured", "Unable to Logout", [
  //         { text: "Cancel" },
  //       ]);
  //     }
  //   },
  //   signUp: async (email, password) => {
  //     try {
  //       const response = await fetch(
  //         `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             email,
  //             password,
  //             returnSecureToken: true,
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         const errorResponse = await response.json();

  //         const errorId = errorResponse.error.message;
  //         let message = "Something went wrong";
  //         if (errorId === "EMAIL_EXISTS") {
  //           message = "Email Exists Already";
  //         }
  //         throw new Error(message);
  //       }

  //       const resData = await response.json();
  //       await AsyncStorage.setItem("userToken", resData.idToken);
  //       await AsyncStorage.setItem("userId", resData.localId);

  //       await store.dispatch({
  //         type: SIGN_UP,
  //         userToken: resData.idToken,
  //         userId: resData.localId,
  //       });
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  // }));

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
