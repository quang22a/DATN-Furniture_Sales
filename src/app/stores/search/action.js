import * as types from "./types";

export const setTextSearch = (data) => async (dispatch) => {
  return dispatch({
    type: types.SET_TEXT_SEARCH,
    payload: data,
  });
};
