import { ADD_ORDER, SET_ORDERS } from "../types";
import Order from "../../models/order";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      "https://rn-store-4963f.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: responseData.id,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-store-4963f.firebaseio.com/orders/u1.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
       
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      
      const loadedOrders = [];

      for (const key in responseData) {
        loadedOrders.push(new Order(
          key,
          responseData[key].cartItems,
          responseData[key].totalAmount,
          new Date(responseData[key].date)
        ));
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err
    }
  };
};
