// src/features/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cart: [] // Assuming cart is part of your state
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProductToCart: (state, action) => {
      state.cart.push(action.payload); // Add product to cart
    },
    removeProductFromCart: (state, action) => {
      state.cart = state.cart.filter(product => product.id !== action.payload.id); // Remove product from cart
    }
  }
});

export const { setProducts, addProductToCart, removeProductFromCart } = productSlice.actions;

export default productSlice.reducer;
