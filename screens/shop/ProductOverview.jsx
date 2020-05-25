import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/ProductItem";

const ProductOverview = () => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          viewDetail={() => {}}
          addToCart={() => {}}
        />
      )}
    />
  );
};

export default ProductOverview;
