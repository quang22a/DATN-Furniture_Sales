import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new ApiService();

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
      payload: error,
    });
  }
};

export const getCategoriesTrending = () => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.category.s + "-trending"]);
    dispatch({
      type: types.GET_CATEGORY_TRENDING_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_CATEGORY_TRENDING_FAIL,
      payload: error,
    });
  }
};
