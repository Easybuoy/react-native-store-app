import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Provider, useSelector } from "react-redux";
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

import { logout } from "../store/actions/auth";
import { useDispatch } from "react-redux";

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
  // const { signOut } = useContext(AuthContext);
  const dispatch = useDispatch();
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
            // headerRight: () => (
            //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
            //     <Item
            //       title="Cart"
            //       iconName={
            //         Platform.OS === "android" ? "md-log-out" : "ios-log-out"
            //       }
            //       onPress={() => dispatch(logout())}
            //     />
            //   </HeaderButtons>
            // ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContentOptions={{ activeTintColor: Colors.PRIMARY }}
      drawerContent={(props) => {
        console.log(props);
        return (
          <View style={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.PRIMARY}
                onPress={() => dispatch(logout())}
              />
            </SafeAreaView>
          </View>
        );
      }}
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
