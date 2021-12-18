import * as types from "./types";

const initialState = {
  textSearch: null,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TEXT_SEARCH:
      return {
        ...state,
        textSearch: action.payload,
      };
    default:
      return { ...state };
  }
};
