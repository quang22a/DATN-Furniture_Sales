import * as types from "./types";
import { AuthService } from "../../services/auth.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new AuthService();

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
      payload: error,
    });
  }
};

export const registerAction = (data, user) => async (dispatch) => {
  try {
    const response =
      user === "customer"
        ? await http.registerCustomer(data)
        : await http.registerStaff(data);
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.REGISTER_FAIL,
      payload: error,
    });
  }
};

export const setNull = () => {
  return {
    type: types.SET_REGISTER_NULL,
    payload: "set null",
  };
};
