import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import Card from "../UI/Card";
import CartItem from "../shop/CartItem";
import Colors from "../../constants/Colors";

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Button
        color={Colors.PRIMARY}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />

      {showDetails && (
        <View style={styles.detailItems}>
          {items.map((item) => (
            <CartItem
              key={item.productTitle}
              title={item.productTitle}
              quantity={item.quantity}
              amount={item.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
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
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
