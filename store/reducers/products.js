import PRODUCTS from "../../data/dummy-data";

const INITIAL_STATE = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = INITIAL_STATE, action) => {
  return state;
};
