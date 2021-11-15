import * as types from "./types";

const intialState = {
  dataCategoryTrending: null,
  errorCategory: null,
  dataBrandFeatured: null,
  errorBrand: null,
};

export const homeReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY_TRENDING_SUCCESS:
      return {
        ...state,
        dataCategoryTrending: action.payload.data,
      };
    case types.GET_CATEGORY_TRENDING_FAIL:
      return {
        ...state,
        errorCategory: true,
        msg: action.payload,
      };
    case types.GET_BRANDS_FEATURED_SUCCESS:
      return {
        ...state,
        dataBrandFeatured: action.payload.data,
      };
    case types.GET_BRANDS_FEATURED_FAIL:
      return {
        ...state,
        errorBrand: true,
        msg: action.payload,
      };
    default:
      return state;
  }
};
