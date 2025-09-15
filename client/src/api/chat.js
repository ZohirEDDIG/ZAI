import axios from 'axios';


const apiUrl = import.meta.env.VITE_API_URL;

export const saveChat = ({ token, chat }) => {
  return axios.post(`${apiUrl}/api/chat/save`, chat, { headers: { authorization: `Bearer ${token}` }});
};

export const updateChat = ({ token, chatId, newMessages }) => {
  return axios.patch(`${apiUrl}/api/chat/update/${chatId}`, { newMessages }, { headers: { authorization: `Bearer ${token}` }});
};

export const deleteChat = ({ token, chatId }) => {
  return axios.delete(`${apiUrl}/api/chat/delete/${chatId}`,  { headers: { authorization: `Bearer ${token}` }})
};

export const renameChat = ({ token, chatId, newTitle }) => {
  return axios.patch(`${apiUrl}/api/chat/rename/${chatId}`, { newTitle },  { headers: { authorization: `Bearer ${token}` }});
};