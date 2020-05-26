import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, TextInput, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { createProduct, updateProduct } from "../../store/actions/products";
import Colors from "../../constants/Colors";

const EditProduct = ({ route, navigation }) => {
  const productId = route.params?.productId;
  
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );
  const dispatch = useDispatch();
  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(updateProduct(productId, title, description, imageUrl, price));
    } else {
      dispatch(createProduct(productId, title, description, imageUrl, +price));
    }
  }, [dispatch, editedProduct, productId, title, description, imageUrl, price]);

  useEffect(() => {
    navigation.setParams({ submitFn: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>

        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.LIGHT_GREY,
    borderBottomWidth: 1,
  },
});

export default EditProduct;
