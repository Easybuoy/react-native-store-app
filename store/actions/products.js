import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from "../types";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId };
};

export const createProduct = (id, title, description, imageUrl, price) => {
  return {
    type: CREATE_PRODUCT,
    productId: id,
    productData: {
      title,
      description,
      imageUrl,
      price,
    },
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
      title,
      description,
      imageUrl,
      price,
    },
  };
};
