import * as types from "./types";

const intialState = {
  dataCategoryTrending: null,
  errorCategory: null,
  msgCategory: null,
  dataBrandFeatured: null,
  errorBrand: null,
  msgBrand: null,
  dataProductsNew: null,
  errorProductsNew: null,
  msgProductNew: null,
};

export const homeReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY_TRENDING_SUCCESS:
      return {
        ...state,
        dataCategoryTrending: action.payload.data,
        errorCategory: false,
        msgCategory: null,
      };
    case types.GET_CATEGORY_TRENDING_FAIL:
      return {
        ...state,
        errorCategory: true,
        msgCategory: action.payload,
      };
    case types.GET_BRANDS_FEATURED_SUCCESS:
      return {
        ...state,
        dataBrandFeatured: action.payload.data,
        errorBrand: false,
        msgBrand: null,
      };
    case types.GET_BRANDS_FEATURED_FAIL:
      return {
        ...state,
        errorBrand: true,
        msgBrand: action.payload,
      };
    case types.GET_LIST_PRODUCT_NEW_SUCCESS:
      return {
        ...state,
        dataProductsNew: action.payload.data,
        errorProductsNew: false,
        msgProductNew: null,
      };
    case types.GET_LIST_PRODUCT_NEW_FAIL:
      return {
        ...state,
        errorProductsNew: true,
        msgProductNew: action.payload,
      };
    default:
      return state;
  }
};
