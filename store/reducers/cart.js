import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";
import CartItem from "../../models/cart-item";

const INITIAL_STATE = {
  items: {},
  totalAmount: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updatedOrNewCartItem = "";

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }

      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: updatedOrNewCartItem,
        },
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCardItem = state.items[action.productId];
      const currentQuantity = selectedCardItem.quantity;
      let updatedCardItems;
      if (currentQuantity > 1) {
        const updatedCardItem = new CartItem(
          selectedCardItem.quantity - 1,
          selectedCardItem.productPrice,
          selectedCardItem.productTitle,
          selectedCardItem.sum - selectedCardItem.productPrice
        );
        updatedCardItems = {
          ...state.items,
          [action.productId]: updatedCardItem,
        };
      } else {
        updatedCardItems = { ...state.items };
        delete updatedCardItems[action.productId];
      }

      return {
        ...state,
        items: updatedCardItems,
        totalAmount: state.totalAmount - selectedCardItem.productPrice,
      };

    default:
      return state;
  }
};
