import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCTS,
} from "../types";
import Product from "../../models/products";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId };
};

export const createProduct = (title, description, imageUrl, price) => async (
  dispatch
) => {
  const response = await fetch(
    "https://rn-store-4963f.firebaseio.com/products.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
      }),
    }
  );

  const responseData = await response.json();
  console.log(responseData);

  return dispatch({
    type: CREATE_PRODUCT,
    productData: {
      id: responseData.id,
      title,
      description,
      imageUrl,
      price,
    },
  });
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};

export const fetchProducts = () => async (dispatch) => {
  const response = await fetch(
    "https://rn-store-4963f.firebaseio.com/products.json",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await response.json();
  console.log(responseData);
  const loadedProducts = [];

  for (const key in responseData) {
    console.log(responseData[key].price, '=--')
    loadedProducts.push(
      new Product(
        key,
        "u1",
        responseData[key].title,
        responseData[key].imageUrl,
        responseData[key].description,
        responseData[key].price
      )
    );
  }
  console.log(loadedProducts);
  dispatch({ type: GET_PRODUCTS, products: loadedProducts });
};
