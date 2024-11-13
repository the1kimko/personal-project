// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer, // Pass the rootReducer here
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in development only
});

export default store;


