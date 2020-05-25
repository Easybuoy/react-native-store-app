import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/ProductItem";

const ProductOverview = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          viewDetail={() =>
            navigation.navigate("Product Detail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            })
          }
          addToCart={() => {}}
        />
      )}
    />
  );
};

export default ProductOverview;
