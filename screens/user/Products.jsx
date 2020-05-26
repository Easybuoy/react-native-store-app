import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const Products = ({}) => {
  const userProducts = useSelector((state) => state.products.userProducts);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          viewDetail={() => {}}
          addToCart={() => {}}
        />
      )}
    />
  );
};

export default Products;
