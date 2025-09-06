import axios from 'axios';
import { apiUrl, setHeaders } from './index'; 


export const getChats = (token) => {
  return axios.get(`${apiUrl}/api/chats`,  { headers: setHeaders(token) });
};
