import * as types from "./types";

const intialState = {
  error: null,
  msg: null,
};

export const contactReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        error: false,
        msg: null,
      };
    case types.CREATE_CONTACT_FAIL:
      return {
        ...state,
        error: true,
        msg: action.payload,
      };
    default:
      return state;
  }
};
