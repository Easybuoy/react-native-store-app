import { ADD_ORDER, SET_ORDERS } from "../types";
import Order from "../../models/order";

const INITIAL_STATE = {
  orders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );

      return {
        ...state,
        orders: [...state.orders, newOrder],
      };
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    default:
      return state;
  }
};
