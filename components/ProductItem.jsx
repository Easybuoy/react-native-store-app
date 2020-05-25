import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

import Colors from "../constants/Colors";

const ProductItem = ({ image, title }) => {
  return (
    <View>
      <Image source={{ uri: image }} />
      <Text>{title}</Text>
      <Text>${price.toFixed(2)}</Text>
      <View>
        <Button title="View details" />
        <Button title="add to cart" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    height: 300,
    margin: 20,
  },
});

export default ProductItem;
