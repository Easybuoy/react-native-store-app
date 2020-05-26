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
      const updatedValues = {
        ...state.inputValues,
        [action.input]: [action.value],
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: [action.isValid],
      };

      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
      };
    default:
      return state;
  }
};

const EditProduct = ({ route, navigation }) => {
  const productId = route.params?.productId;

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

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
    const { title, description, imageUrl, price } = formState.inputValues;
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please check form errors", [{ text: "Ok" }]);
      return;
    }

    if (editedProduct) {
      dispatch(updateProduct(productId, title, description, imageUrl, price));
    } else {
      dispatch(createProduct(productId, title, description, imageUrl, +price));
    }
    navigation.goBack();
  }, [dispatch, editedProduct, productId, formState]);

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
            value={formState.inputValues.title}
            onChangeText={(text) => textChangeHandler(text, "title")}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onEndEditing={() => console.log("a")}
            onSubmitEditing={() => console.log("a")}
          />
          {!formState.inputValidities.title && (
            <Text>Please enter a valid title!</Text>
          )}
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => textChangeHandler(text, "imageUrl")}
            returnKeyType="next"
          />
          {!formState.inputValidities.imageUrl && (
            <Text>Please enter a valid Image Url!</Text>
          )}
        </View>

        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={(text) => textChangeHandler(text, price)}
              keyboardType="decimal-pad"
            />
            {!formState.inputValidities.price && (
              <Text>Please enter a valid price!</Text>
            )}
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(text) => textChangeHandler(text, "description")}
          />
          {!formState.inputValidities.description && (
            <Text>Please enter a valid description!</Text>
          )}
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
