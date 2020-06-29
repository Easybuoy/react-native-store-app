import React, { useState } from "react";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
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
  const [fontLoaded, setFontLoaded] = useState(false);

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
      <NavigationContainer>
        {/* {isSignedIn ? <MyDrawer /> : <AuthNavigator />} */}
        {/* <MyDrawer /> */}
        {/* <AuthNavigator /> */}
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
