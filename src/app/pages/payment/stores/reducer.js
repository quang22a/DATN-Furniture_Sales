import * as types from "./types";

const intialState = {
  errorCreate: null,
  msgCreate: null,
};

export const paymentReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.CREATE_BILL_SUCCESS:
      return {
        ...state,
        errorCreate: false,
        msgCreate: null,
      };
    case types.CREATE_BILL_FAIL:
      return {
        ...state,
        errorCreate: true,
        msgCreate: action.payload,
      };
    default:
      return state;
  }
};
