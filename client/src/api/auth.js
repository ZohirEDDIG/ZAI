import axios from 'axios';
import { apiUrl } from './index';

export const login = (userData) => {
  return axios.post(`${apiUrl}/api/auth/login`, userData);
};

export const register = (userData) => {
  return axios.post(`${apiUrl}/api/auth/register`, userData);
};
