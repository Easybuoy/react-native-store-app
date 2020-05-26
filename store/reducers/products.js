import { DELETE_PRODUCT } from "../types";
import PRODUCTS from "../../data/dummy-data";

const INITIAL_STATE = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
      };
    default:
      return state;
  }
};
