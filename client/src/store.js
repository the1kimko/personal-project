// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import serviceReducer from './features/serviceSlice';
import cartReducer from './features/cartSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    services: serviceReducer,
    cart: cartReducer,
  },
});

export default store;
