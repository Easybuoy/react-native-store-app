import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton";
import ProductOverview from "../screens/shop/ProductOverview";
import ProductDetail from "../screens/shop/ProductDetail";
import Orders from "../screens/shop/Orders";
import Cart from "../screens/shop/Cart";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();
let screenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.PRIMARY : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerBackTitle: "Back",
  headerTintColor: Platform.OS === "android" ? Colors.WHITE : Colors.PRIMARY,
};

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={ProductOverview}
        options={({ navigation }) => {
          return {
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  onPress={() => navigation.navigate("Cart")}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <Stack.Screen
        name="Product Detail"
        component={ProductDetail}
        options={({ route }) => {
          const { productTitle } = route.params;
          return {
            headerTitle: productTitle,
          };
        }}
      />
      <Stack.Screen name="Your Cart" component={Cart} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Drawer.Screen name="Home" component={MyStack} />
      <Drawer.Screen name="Your Orders" component={Orders} />
    </Drawer.Navigator>
  );
};

export { MyStack, MyDrawer };
