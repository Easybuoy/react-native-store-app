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

import Input from "../../components/UI/Input";
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

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      let isValid = false;

      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={() => {
            inputChangeHandler("title");
          }}
          initialValue={editedProduct ? editedProduct.title : ""}
          initiallyValid={!!editedProduct}
          required
          errorText="Please enter a valid title"
        />

        <Input
          id="imageUrl"
          label="Image Url"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          initialValue={editedProduct ? editedProduct.imageUrl : ""}
          initiallyValid={!!editedProduct}
          required
          onInputChange={() => {
            inputChangeHandler("imageUrl");
          }}
          errorText="Please enter a valid image url"
        />

        {editedProduct ? null : (
          <Input
            id="price"
            label="Price"
            keyboardType="decimal-pad"
            returnKeyType="next"
            required
            min={0.1}
            onInputChange={() => {
              inputChangeHandler("price");
            }}
            errorText="Please enter a valid price"

          />
        )}

        <Input
          id="description"
          label="Description"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          multiLine
          numberOfLines={3}
          initialValue={editedProduct ? editedProduct.description : ""}
          initiallyValid={!!editedProduct}
          required
          minLength={5}
          onInputChange={() => {
            inputChangeHandler("description");
          }}
          errorText="Please enter a valid description"

        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProduct;
