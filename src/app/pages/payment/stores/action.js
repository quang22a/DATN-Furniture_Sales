import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new ApiService();

export const createBill = (data) => async (dispatch) => {
  try {
    const response = await http.post([ENDPOINT.bill.index], data);
    dispatch({
      type: types.CREATE_BILL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.CREATE_BILL_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
