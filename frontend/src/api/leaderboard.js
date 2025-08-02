
import api from './api'

const API_BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const getLeaderBoard = async (tenant = 'TEST_TENANT' , period) => {
    try {
      const response = await api.get(`${API_BASE_URL}leaderboard/${tenant}${period? `/${period}` : ''}`);
      return response.data; // Assuming the response has user data or a token
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
};

export const getUserLeaderBoard = async (userId) => {
  try {
    const response = await api.get(`${API_BASE_URL}leaderboard/user/${userId}`);
    return response.data; // Assuming the response has user data or a token
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};


