import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";
import { setModal } from "../../../stores/modal/action";

const http = new ApiService();

export const getProfile = () => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.auth.profile]);
    dispatch({
      type: types.GET_PROFILE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_PROFILE_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.auth.profile], data);
    dispatch({
      type: types.UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: "snapback",
        title: "",
        content: "Cập nhật thông tin cá nhân thành công",
      })
    );
  } catch (error) {
    dispatch({
      type: types.UPDATE_PROFILE_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const updatePassword = (data) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.auth.updatePassword], data);
    dispatch({
      type: types.UPDATE_PASSWORD_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: "snapback",
        title: "",
        content: "Đổi mật khẩu thành công",
      })
    );
  } catch (error) {
    dispatch({
      type: types.UPDATE_PASSWORD_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getHistoryBill = () => async (dispatch) => {
  try {
    const response = await http.get([`${ENDPOINT.bill.index}-user`]);
    dispatch({
      type: types.GET_HISTORY_BILL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_HISTORY_BILL_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getDetailBill = (id) => async (dispatch) => {
  try {
    const response = await http.get([`${ENDPOINT.bill.list}/${id}`]);
    dispatch({
      type: types.GET_BILL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_BILL_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getProductOfBill = (billId) => async (dispatch) => {
  try {
    const response = await http.get([
      `${ENDPOINT.bill.index}-product/${billId}`,
    ]);
    dispatch({
      type: types.GET_BILL_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_BILL_PRODUCT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
