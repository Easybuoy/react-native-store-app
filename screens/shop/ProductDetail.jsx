import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const ProductDetail = ({ route }) => {
  const { productId } = route.params;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );
  console.log(productId);
  return (
    <ScrollView>
      <View>
        <Text>{selectedProduct.title}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ProductDetail;
