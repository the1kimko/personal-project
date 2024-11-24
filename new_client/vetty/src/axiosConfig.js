// src/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5555', // Base URL for backend API
  headers: {
    'Content-Type': 'application/json', // Default header for JSON requests
  },
});

// Add an interceptor to include the authorization token in requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Fetch the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

export default api;