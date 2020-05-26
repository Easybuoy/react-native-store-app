import React from "react";
import { View, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import { addToCart } from "../../store/actions/cart";
import ProductItem from "../../components/shop/ProductItem";

const ProductOverview = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);

  const selectHandler = (id, title) => {
    navigation.navigate("Product Detail", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => selectHandler(itemData.item.id, itemData.item.title)}
          addToCart={() => dispatch(addToCart(itemData.item))}
        >
          <Button
            color={Colors.PRIMARY}
            title="View details"
            onPress={() => selectHandler(itemData.item.id, itemData.item.title)}
          />
          <Button
            color={Colors.PRIMARY}
            title="Add to cart"
            onPress={() => dispatch(addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductOverview;
