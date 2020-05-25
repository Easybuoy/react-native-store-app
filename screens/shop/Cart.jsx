import React from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { removeFromCart } from "../../store/actions/cart";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";

const Cart = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItem = [];
    for (const key in state.cart.items) {
      transformedCartItem.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItem.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotal.toFixed()}</Text>
        </Text>
        <Button
          color={Colors.SECONDARY}
          title="Order  Now"
          disabled={cartItems.length === 0}
          onPress={() => {}}
        />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            amount={itemData.item.sum}
            onRemove={() => dispatch(removeFromCart(itemData.item.productId))}
          />
        )}
      />
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
    fontFamily: "open-sans-bold",
  },
  amount: {
    color: Colors.SECONDARY,
  },
});
export default Cart;
