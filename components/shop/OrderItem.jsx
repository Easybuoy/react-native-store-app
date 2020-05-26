import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import CardItem from "./CartItem";
import Colors from "../../constants/Colors";

const OrderItem = ({ amount, date }) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Button color={Colors.PRIMARY} title="Show Details" />
      {/* <CardItem /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: Colors.GREY,
  },
});

export default OrderItem;
