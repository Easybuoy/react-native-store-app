import React, { useState, useEffect, useRef } from "react";
// import { AuthContext } from "./components/Context";
import { NavigationContainer } from "@react-navigation/native";
import { API_KEY } from "react-native-dotenv";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-native";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-community/async-storage";

// import authReducer from "./store/reducers/auth";
import { signup, login, logout, restoreToken } from "./store/actions/auth";
import { SIGN_IN, SIGN_UP, RESTORE_TOKEN, LOGOUT } from "./store/types";
import { MyDrawer, AuthNavigator } from "./navigation/Navigator";

const Root = () => {
  const [token, setToken] = useState(null);
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    if (isInitialMount.current) {
      dispatch(restoreToken());
      isInitialMount.current = false;
    } else {
      setToken(authToken);
    }
  }, [authToken]);

  return (
    <NavigationContainer>
      {token !== null ? <MyDrawer /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Root;
