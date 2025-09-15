import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const getChats = (token) => {
  return axios.get(`${apiUrl}/api/chats`,  { headers: { authorization: `Bearer ${token}` }});
};