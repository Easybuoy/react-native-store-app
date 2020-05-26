import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { createProduct, updateProduct } from "../../store/actions/products";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
  }
};

const EditProduct = ({ route, navigation }) => {
  const productId = route.params?.productId;

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );
  // const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  // const [titleIsValid, setTitleIsValid] = useState(false);
  // const [imageUrl, setImageUrl] = useState(
  //   editedProduct ? editedProduct.imageUrl : ""
  // );
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState(
  //   editedProduct ? editedProduct.description : ""
  // );
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      description: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert("Wrong Input", "Please check form errors", [{ text: "Ok" }]);
      return;
    }
    if (editedProduct) {
      dispatch(updateProduct(productId, title, description, imageUrl, price));
    } else {
      dispatch(createProduct(productId, title, description, imageUrl, +price));
    }
    navigation.goBack();
  }, [
    dispatch,
    editedProduct,
    productId,
    title,
    description,
    imageUrl,
    price,
    titleIsValid,
  ]);

  useEffect(() => {
    navigation.setParams({ submitFn: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (text, input) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => textChangeHandler(text, "title")}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onEndEditing={() => console.log("a")}
            onSubmitEditing={() => console.log("a")}
          />
          {!titleIsValid && <Text>Please enter a valid title!</Text>}
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => textChangeHandler(text, "imageUrl")}
            returnKeyType="next"
          />
        </View>

        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => textChangeHandler(text, price)}
              keyboardType="decimal-pad"
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => textChangeHandler(text, 'description')}
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
