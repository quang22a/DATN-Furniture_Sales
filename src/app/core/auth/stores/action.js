import * as types from "./types";
import { AuthService } from "../../services/auth.service";
import { ApiService } from "../../services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

import { setModal } from "../../../stores/modal/action";

const http = new AuthService();
const api = new ApiService();

export const login = (dataLogin) => async (dispatch) => {
  try {
    const response = await http.signIn(dataLogin);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.LOGIN_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const registerAction = (data) => async (dispatch) => {
  try {
    const response = await http.registerCustomer(data);
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.REGISTER_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const setNull = () => {
  return {
    type: types.SET_REGISTER_NULL,
    payload: "set null",
  };
};

export const requestResetPassword = (data) => async (dispatch) => {
  try {
    const response = await api.post([ENDPOINT.auth.requestResetPass], data);
    dispatch({
      type: types.REQUEST_RESET_PASSWORD_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: "snapback",
        title: "",
        content: response.msg,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.REQUEST_RESET_PASSWORD_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const changePasswordReset = (data) => async (dispatch) => {
  try {
    const response = await api.post([ENDPOINT.auth.changePasswordReset], data);
    dispatch({
      type: types.CHANGE_PASSWORD_RESET_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: "snapback",
        title: "",
        content: "Reset password success",
      })
    );
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.CHANGE_PASSWORD_RESET_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
