import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

const ProductItem = () => {
  return (
    <View>
      <Image />
      <Text>Title</Text>
      <Text>Price</Text>
      <View>
        <Button title="View details" />
        <Button title="add to cart" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductItem;
