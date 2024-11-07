import axios from 'axios';

const API_URL = 'http://localhost:5000/api/services';  // Replace with your backend API URL

export const fetchServices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
