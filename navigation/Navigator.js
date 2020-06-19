import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import HeaderButton from "../components/UI/HeaderButton";
import ProductOverview from "../screens/shop/ProductOverview";
import ProductDetail from "../screens/shop/ProductDetail";
import Orders from "../screens/shop/Orders";
import Cart from "../screens/shop/Cart";
import Products from "../screens/user/Products";
import EditProduct from "../screens/user/EditProduct";
import Auth from "../screens/user/Auth";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();
let screenOptionsStyle = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.PRIMARY : "",
    borderBottomWidth: 1,
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

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStyle}>
      <Stack.Screen
        name="Product Overview"
        component={ProductOverview}
        options={({ navigation }) => {
          return {
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => navigation.toggleDrawer()}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  onPress={() => navigation.navigate("Your Cart")}
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

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStyle}>
      <Stack.Screen
        name="Products"
        component={Products}
        options={({ navigation, route }) => {
          return {
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => navigation.toggleDrawer()}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add"
                  iconName={
                    Platform.OS === "android" ? "md-create" : "ios-create"
                  }
                  onPress={() => navigation.navigate("Edit Product")}
                />
              </HeaderButtons>
            ),
          };
        }}
      />

      <Stack.Screen
        name="Edit Product"
        component={EditProduct}
        options={({ route }) => {
          const productId = route.params?.productId;
          const submitFn = route.params?.submitFn;

          return {
            headerTitle: productId ? "Edit Product" : "Add Product",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add"
                  iconName={
                    Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
                  }
                  onPress={submitFn}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

const OrderStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStyle}>
      <Stack.Screen
        name="Your Orders"
        component={Orders}
        options={({ navigation }) => {
          return {
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => navigation.toggleDrawer()}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContentOptions={{ activeTintColor: Colors.PRIMARY }}
    >
      <Drawer.Screen
        name="Products"
        component={HomeStack}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Your Orders"
        component={OrderStack}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminStack}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionsStyle}>
      <Stack.Screen name="Authenticate" component={Auth} />
    </Stack.Navigator>
  );
};

export { MyDrawer, AuthNavigator };
