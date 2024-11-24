// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
