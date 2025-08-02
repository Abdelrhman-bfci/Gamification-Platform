import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL, // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to dynamically set the Authorization header
api.interceptors.request.use(
  (config) => {
    // Retrieve the latest token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // Remove the header if no token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
