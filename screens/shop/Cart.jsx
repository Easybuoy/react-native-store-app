import React from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";
const Cart = () => {
  const cartTotal = useSelector((state) => state.cart.totalAmount);

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotal}</Text>
          <Button title="Order Now" onPress={() => {}} />
        </Text>
      </View>

      {/* <FlatList /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  summaryText: {
      fontSize: 18,
      color: Colors.SECONDARY
  },
  amount: {},
});
export default Cart;
