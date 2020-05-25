import { ADD_TO_CART } from "../types";

const INITIAL_STATE = {
  items: {},
  totalAmount: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      return {
        ...state,
        totalAmount: totalAmount++,
      };
    default:
      return state;
  }
};
