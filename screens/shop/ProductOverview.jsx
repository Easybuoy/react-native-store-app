import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import { addToCart } from "../../store/actions/cart";
import ProductItem from "../../components/shop/ProductItem";
import { fetchProducts } from "../../store/actions/products";

const ProductOverview = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);

  const loadProducts = useCallback(async () => {
    setError(null);
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      setError("Error occured");
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);

    loadProducts();
    setIsLoading(false);
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", () => loadProducts);

    return () => {
      // willFocusSub.remove()
    }
  }, [loadProducts]);

  const selectHandler = (id, title) => {
    navigation.navigate("Product Detail", {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.PRIMARY}
        ></Button>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Products Found, Add a product</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductOverview;
