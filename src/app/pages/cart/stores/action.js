import { UPDATE_CART, DELETE_PRODUCT, CLEAR_CART } from "./types";

export const deleteProductAction = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
};

export const addToCartAction = (product, quantity) => {
  return {
    type: UPDATE_CART,
    payload: {
      product: product,
      id: product.id,
      quantity: quantity,
    },
  };
};

export const clearCart = () => {
  localStorage.removeItem("cart");
  return {
    type: CLEAR_CART,
    payload: "clear cart",
  };
};
