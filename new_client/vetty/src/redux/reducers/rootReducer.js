// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  // Add other reducers here if needed
});

export default rootReducer;
