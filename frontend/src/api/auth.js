import axios from 'axios';
import api from './api'



const API_BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;


export const login = async (credentials) => {
  try {
    console.error('Login error', API_BASE_URL);
    const response = await axios.post(`${API_BASE_URL}auth/login`, credentials);
    localStorage.setItem('token', response.data.token);
    return response.data; // Assuming the response has user data or a token
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};


export const signup = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/signup`, data);
      return response.data; // Assuming the response has user data or a token
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
};


export const profile = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}auth/profile`);
      return response.data; // Assuming the response has user data or a token
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
};