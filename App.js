import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { MyStack } from "./navigation/Navigator";
import store from "./store";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MyStack />
      </Provider>
    </NavigationContainer>
  );
}
