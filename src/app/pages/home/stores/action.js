import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new ApiService();

export const getNoti = () => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.notification]);
    dispatch({
      type: types.GET_NOTIFICATION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_NOTIFICATION_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getBrandsFeatured = () => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.brand.index + "s-featured"]);
    dispatch({
      type: types.GET_BRANDS_FEATURED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_BRANDS_FEATURED_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getCategoriesTrending = () => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.category.list + "-trending"]);
    dispatch({
      type: types.GET_CATEGORY_TRENDING_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_CATEGORY_TRENDING_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getListProductNew = () => async (dispatch) => {
  try {
    const response = await http.get([`${ENDPOINT.product.list}-new`]);
    dispatch({
      type: types.GET_LIST_PRODUCT_NEW_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_LIST_PRODUCT_NEW_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
