import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from "../types";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId };
};

export const createProduct = (title, description, imageUrl, price) => (
  dispatch
) => {
  // const response = await fetch(
  //   "https://rn-store-4963f.firebaseio.com/products.json",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title,
  //       description,
  //       imageUrl,
  //       price,
  //     }),
  //   }
  // );

  // const responseData = await response.json();
  // console.log(responseData);
  // return dispatch({
  //   type: CREATE_PRODUCT,
  //   productId: id,
  //   productData: {
  //     title,
  //     description,
  //     imageUrl,
  //     price,
  //   },
  // });
  dispatch({
    type: CREATE_PRODUCT,
    productData: {
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
