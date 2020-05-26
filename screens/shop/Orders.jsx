import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);
  console.log(orders);
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};

const styles = StyleSheet.create({});

export default Orders;
