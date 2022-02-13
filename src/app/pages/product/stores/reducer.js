import * as types from "./types";

const intialState = {
  listCategories: null,
  listBrands: null,
  listRatings: null,
  dataList: null,
  dataDetail: null,
  listRs: null,
  errorCategory: null,
  errorBrand: null,
  errorGetList: null,
  errorGetDetail: null,
  errorAddRating: null,
  errorListRating: null,
  errorRs: null,
  msgCategory: null,
  msgBrand: null,
  msgGetList: null,
  msgGetDetail: null,
  msgAddRating: null,
  msgListRating: null,
  msgRs: null,
};

export const productReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        listCategories: action.payload.data,
        errorCategory: false,
        msgCategory: null,
      };
    case types.GET_LIST_CATEGORY_FAIL:
      return {
        ...state,
        errorCategory: true,
        msgCategory: action.payload,
      };
    case types.GET_LIST_BRAND_SUCCESS:
      return {
        ...state,
        listBrands: action.payload.data,
        errorBrand: false,
        msgBrand: null,
      };
    case types.GET_LIST_BRAND_FAIL:
      return {
        ...state,
        errorBrand: false,
        msgBrand: null,
      };
    case types.GET_LIST_PRODUCT_SUCCESS:
      return {
        ...state,
        dataList: action.payload.data,
        errorGetList: false,
        msgGetList: null,
      };
    case types.GET_LIST_PRODUCT_FAIL:
      return {
        ...state,
        errorGetList: false,
        msgGetList: null,
      };
    case types.GET_LIST_PRODUCT_RS_SUCCESS:
      return {
        ...state,
        listRs: action.payload.data,
        errorRs: false,
        msgRs: null,
      };
    case types.GET_LIST_PRODUCT_RS_FAIL:
      return {
        ...state,
        errorRs: false,
        msgRs: null,
      };
    case types.GET_LIST_PRODUCT_SUCCESS:
      return {
        ...state,
        dataList: action.payload.data,
        errorGetList: false,
        msgGetList: null,
      };
    case types.GET_LIST_PRODUCT_FAIL:
      return {
        ...state,
        errorGetList: false,
        msgGetList: null,
      };
    case types.GET_DETAIL_PRODUCT_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        errorGetDetail: false,
        msgGetDetail: null,
      };
    case types.GET_DETAIL_PRODUCT_FAIL:
      return {
        ...state,
        errorGetDetail: true,
        msgGetDetail: action.payload,
      };
    case types.ADD_RATING_SUCCESS:
      return {
        ...state,
        errorAddRating: false,
        msgAddRating: null,
      };
    case types.ADD_RATING_FAIL:
      return {
        ...state,
        errorAddRating: true,
        msgAddRating: action.payload,
      };
    case types.GET_RATINGS_SUCCESS:
      return {
        ...state,
        listRatings: action.payload.data,
        errorListRating: false,
        msgListRating: null,
      };
    case types.GET_RATINGS_FAIL:
      return {
        ...state,
        errorListRating: true,
        msgListRating: action.payload,
      };
    default:
      return state;
  }
};
