import React from "react";
import { FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";
import ProductItem from "../../components/shop/ProductItem";
import { NavigationContainer } from "@react-navigation/native";

const Products = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);

  const onSelectHandler = (id) => {
    navigation.navigate("Edit Product", {
      productId: id,
    });
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => onSelectHandler(itemData.item.id)}
          addToCart={() => {}}
        >
          <Button
            color={Colors.PRIMARY}
            title="Edit"
            onPress={() => onSelectHandler(itemData.item.id)}
          />
          <Button
            color={Colors.PRIMARY}
            title="Delete"
            onPress={() => dispatch(deleteProduct(itemData.item.id))}
          />
        </ProductItem>
      )}
    />
  );
};

export default Products;
