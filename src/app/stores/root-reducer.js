import { combineReducers } from 'redux';
import { authReducer } from '../core/auth/stores/reducer';
import { modalReducer } from './modal/reducer';
import { errorReducer } from './error/reducer';
import { searchReducer } from './search/reducer';
import { cartReducer } from '../pages/cart/stores/reducer';
import { homeReducer } from '../pages/home/stores/reducer';
import { productReducer } from '../pages/product/stores/reducer';
import { profileReducer } from '../pages/profile/stores/reducer';
import { contactReducer } from '../pages/contact/stores/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  modalReducer,
  errorReducer,
  searchReducer,
  cartReducer,
  homeReducer,
  productReducer,
  profileReducer,
  contactReducer,
});

export default rootReducer;
