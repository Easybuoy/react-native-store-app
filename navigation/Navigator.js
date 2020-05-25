import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import ProductOverview from "../screens/shop/ProductOverview";
import Colors from "../constants/Colors";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.PRIMARY },
        headerTintColor: Colors.WHITE,
      }}
    >
      <Stack.Screen name="Home" component={ProductOverview} />
    </Stack.Navigator>
  );
}

export { MyStack };
