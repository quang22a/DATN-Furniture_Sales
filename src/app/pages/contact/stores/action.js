import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";
import { setModal } from "../../../stores/modal/action";

const http = new ApiService();

export const addContact = (data) => async (dispatch) => {
  try {
    const response = await http.post([ENDPOINT.contact], data);
    dispatch({
      type: types.CREATE_CONTACT_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: "snapback",
        title: "",
        content: "Tạo liên hệ thành công",
      })
    );
  } catch (error) {
    dispatch({
      type: types.CREATE_CONTACT_SUCCESS,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
