import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const ProductItem = ({
  image,
  title,
  price,
  onSelect,
  children,
}) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent useForeground onPress={onSelect}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>

            <View style={styles.productDetail}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>

            <View style={styles.actions}>{children}</View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: Colors.GREY,
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 10,
  },
  productDetail: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
});

export default ProductItem;
