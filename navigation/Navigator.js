import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import ProductOverview from "../screens/shop/ProductOverview";
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
    </Stack.Navigator>
  );
};

export { MyStack };
