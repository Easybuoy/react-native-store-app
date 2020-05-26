import React from "react";
import { FlatList, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";
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
          onSelect={() => {}}
          addToCart={() => {}}
        >
          <Button
            color={Colors.PRIMARY}
            title="Edit"
            onPress={() => selectHandler(itemData.item.id, itemData.item.title)}
          />
          <Button
            color={Colors.PRIMARY}
            title="Delete"
            onPress={() => dispatch(addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

export default Products;
