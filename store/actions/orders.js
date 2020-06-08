import { ADD_ORDER } from "../types";

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
