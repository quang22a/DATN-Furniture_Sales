import { AuthStorageService } from "../../services/authStorage.service";
import * as types from "./types";

const storage = new AuthStorageService();
const intialState = {
  token: storage.getToken() ? storage.getToken() : null,
  error: null,
  errorLogin: null,
  data: null,
  msg: null,
};

export const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      const userInfo = {
        role: action.payload.role,
        name: action.payload.name,
        img: action.payload.image,
        userId: action.payload.userId,
      };
      storage.setToken(action.payload.accessToken);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return {
        ...state,
        token: action.payload.accessToken,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        errorLogin: true,
        msg: action.payload,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        error: false,
        msg: action.payload,
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        error: true,
        msg: action.payload,
      };
    case types.SET_REGISTER_NULL:
      return {
        ...state,
        error: null,
        msg: null,
      };
    default:
      return state;
  }
};
