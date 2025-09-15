import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const login = (userData) => {
  return axios.post(`${apiUrl}/api/auth/login`, userData);
};

export const register = (userData) => {
  return axios.post(`${apiUrl}/api/auth/register`, userData);
};