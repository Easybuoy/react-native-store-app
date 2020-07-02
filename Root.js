import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import * as Font from "expo-font";
import AsyncStorage from "@react-native-community/async-storage";

import { restoreToken } from "./store/actions/auth";
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
