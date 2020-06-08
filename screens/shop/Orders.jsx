import React, { useEffect } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrders } from "../../store/actions/orders";

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default Orders;
