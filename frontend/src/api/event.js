
import api from './api'

const API_BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;


export const createEvent = async (data) => {
  try {
    const response = await api.post(`${API_BASE_URL}event`, data);
    return response.data; // Assuming the response has user data or a token
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

