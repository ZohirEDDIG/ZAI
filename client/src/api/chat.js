import axios from 'axios';
import { apiUrl, setHeaders } from './index';

export const saveChat = ({ token, chat }) => {
  return axios.post(`${apiUrl}/api/chat/save`, chat, { headers: setHeaders(token) });
};

export const updateChat = ({ token, chatId, newMessages }) => {
  return axios.patch(`${apiUrl}/api/chat/update/${chatId}`, { newMessages }, { headers: setHeaders(token) });
};

export const deleteChat = ({ chatId, token }) => {
  return axios.delete(`${apiUrl}/api/chat/delete/${chatId}`,  { headers: setHeaders(token) })
};

export const renameChat = ({ chatId, newTitle, token }) => {
  return axios.patch(`${apiUrl}/api/chat/rename/${chatId}`, { newTitle },  { headers: setHeaders(token) });
};