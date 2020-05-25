import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "../../store/actions/cart";
import ProductItem from "../../components/shop/ProductItem";

const ProductOverview = ({ navigation }) => {
  const dispatch = useDispatch();

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
              productTitle: itemData.item.title,
            })
          }
          addToCart={() => dispatch(addToCart(itemData.item))}
        />
      )}
    />
  );
};

export default ProductOverview;
