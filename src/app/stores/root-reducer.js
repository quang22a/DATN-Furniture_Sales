import { combineReducers } from "redux";
import { authReducer } from "../core/auth/stores/reducer";
import { modalReducer } from "./modal/reducer";
import { errorReducer } from "./error/reducer";
import { homeReducer } from "../pages/home/stores/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modalReducer,
  errorReducer,
  homeReducer,
});

export default rootReducer;
