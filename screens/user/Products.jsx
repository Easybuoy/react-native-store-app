import React from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Alert, View, Text } from "react-native";

import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";
import ProductItem from "../../components/shop/ProductItem";

const Products = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);

  const onSelectHandler = (id) => {
    navigation.navigate("Edit Product", {
      productId: id,
    });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No products found, create one now </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          key={itemData.item.id}
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
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export default Products;
