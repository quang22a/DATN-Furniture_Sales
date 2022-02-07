import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";
import { setModal } from "../../../stores/modal/action";

const http = new ApiService();

export const getListCategory = () => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.category.list]);
    dispatch({
      type: types.GET_LIST_CATEGORY_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_LIST_CATEGORY_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getListBrand = () => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.brand.list]);
    dispatch({
      type: types.GET_LIST_BRAND_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_LIST_BRAND_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getListProduct =
  (searchCategory, searchBrand, sortPriceState, page, take, search) =>
  async (dispatch) => {
    try {
      let url = `${ENDPOINT.product.list}?page=${page}&take=${take}`;
      if (searchCategory) {
        url = url + "&category=" + searchCategory;
      }
      if (searchBrand) {
        url = url + "&brand=" + searchBrand;
      }
      if (sortPriceState) {
        url = url + "&sortPrice=" + sortPriceState;
      }
      if (search) {
        url = url + "&search=" + search;
      }
      const response = await http.get([url + "&status=" + true]);
      dispatch({
        type: types.GET_LIST_PRODUCT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.GET_LIST_PRODUCT_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };

export const getDetailProduct = (id) => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.product.list, id]);
    dispatch({
      type: types.GET_DETAIL_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_DETAIL_PRODUCT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const addRating = (data) => async (dispatch) => {
  try {
    const response = await http.post([ENDPOINT.rating.index], data);
    dispatch({
      type: types.ADD_RATING_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: "snapback",
        title: "",
        content: "Thêm đánh giá thành công",
      })
    );
  } catch (error) {
    dispatch({
      type: types.ADD_RATING_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getRatings =
  (productId, page = 1) =>
  async (dispatch) => {
    try {
      const response = await http.get([
        `${ENDPOINT.rating.list}/${productId}?page=${page}`,
      ]);
      dispatch({
        type: types.GET_RATINGS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: types.GET_RATINGS_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };
