import * as types from "./types";

const intialState = {
  dataProfile: null,
  historyBill: [],
  errorProfile: null,
  msgProfile: null,
  errorUpdateProfile: null,
  msgUpdateProfile: null,
  errorUpdatePassword: null,
  msgUpdatePassword: null,
  errorGetBill: null,
  msgGetBill: null,
  bill: null,
  errorBill: null,
  msgBill: null,
  listProductBill: null,
  errorGetProduct: null,
  msgGetProduct: null,
};

export const profileReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        dataProfile: action.payload.user,
        errorProfile: false,
        msgProfile: null,
      };
    case types.GET_PROFILE_FAIL:
      return {
        ...state,
        errorProfile: true,
        msgProfile: action.payload,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        errorUpdateProfile: false,
        msgUpdateProfile: null,
      };
    case types.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        errorUpdateProfile: true,
        msgUpdateProfile: action.payload,
      };
    case types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        errorUpdatePassword: false,
        msgUpdatePassword: null,
      };
    case types.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        errorUpdatePassword: true,
        msgUpdatePassword: action.payload,
      };
    case types.GET_HISTORY_BILL_SUCCESS:
      return {
        ...state,
        historyBill: action.payload.data,
        errorGetBill: false,
        msgGetBill: null,
      };
    case types.GET_HISTORY_BILL_FAIL:
      return {
        ...state,
        errorGetBill: true,
        msgGetBill: action.payload,
      };
    case types.GET_BILL_SUCCESS:
      return {
        ...state,
        bill: action.payload.data,
        errorBill: false,
        msgBill: null,
      };
    case types.GET_BILL_FAIL:
      return {
        ...state,
        errorBill: true,
        msgBill: action.payload,
      };
    case types.GET_BILL_PRODUCT_SUCCESS:
      return {
        ...state,
        listProductBill: action.payload.data,
        errorGetProduct: false,
        msgGetProduct: null,
      };
    case types.GET_BILL_PRODUCT_FAIL:
      return {
        ...state,
        errorGetProduct: true,
        msgGetProduct: action.payload,
      };
    default:
      return state;
  }
};
