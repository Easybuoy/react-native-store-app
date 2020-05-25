import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductDetail = ({ route }) => {
  const dispatch = useDispatch();
  const { productId } = route.params;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <ScrollView>
      <View>
        <Image
          style={styles.image}
          source={{ uri: selectedProduct.imageUrl }}
        />
        <View style={styles.action}>
          <Button
            color={Colors.PRIMARY}
            title="Add to Cart"
            onPress={() => dispatch(addToCart(selectedProduct))}
          />
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed()}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
  },
  price: {
    fontSize: 20,
    color: Colors.GREY,
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
  action: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetail;
