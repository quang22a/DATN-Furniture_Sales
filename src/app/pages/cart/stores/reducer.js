import { UPDATE_CART, DELETE_PRODUCT, CLEAR_CART } from "./types";
import { updateCart } from "../../../shared/helpers/utils/updateCart";
import { deleteProduct } from "../../../shared/helpers/utils/deleteProduct";

const data = JSON.parse(localStorage.getItem("cart") || "[]");
const quantity = data.reduce(
  (accumulator, currentItem) => accumulator + currentItem.quantity,
  0
);
const initialState = {
  data: data,
  quantity: quantity,
};

export const cartReducer = (state = initialState, action) => {
  let newData;
  let quantity;
  switch (action.type) {
    case UPDATE_CART:
      newData = updateCart(
        state.data,
        action.payload.product,
        action.payload.quantity
      ).slice();
      quantity = 0;
      for (let item of newData) {
        quantity += item.quantity;
      }
      return {
        ...state,
        data: newData,
        quantity: quantity,
      };
    case DELETE_PRODUCT:
      newData = deleteProduct(state.data, action.payload).slice();
      quantity = 0;
      for (let item of newData) {
        quantity += item.quantity;
      }
      return {
        ...state,
        data: newData,
        quantity: quantity,
      };
    case CLEAR_CART:
      return {
        ...state,
        data: [],
        quantity: 0,
      };
    default:
      return { ...state };
  }
};
