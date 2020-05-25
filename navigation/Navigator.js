import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

import ProductOverview from "../screens/shop/ProductOverview";
import ProductDetail from "../screens/shop/ProductDetail";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.PRIMARY : "",
        },
        headerTintColor:
          Platform.OS === "android" ? Colors.WHITE : Colors.PRIMARY,
      }}
    >
      <Stack.Screen name="Home" component={ProductOverview} />
      <Stack.Screen name="Product Detail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export { MyStack };
