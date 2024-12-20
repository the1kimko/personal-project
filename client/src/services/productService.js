// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';  // Replace with your backend API URL

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
