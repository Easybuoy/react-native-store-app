import { combineReducers } from "redux";

import productsReducer from "./products";
import cartReducer from "./cart";
import orderReducer from "./orders";
import authReducer from "./auth";

export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});
