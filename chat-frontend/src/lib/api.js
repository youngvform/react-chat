import axios from 'axios';
import queryString from 'query-string';

export const getChatList = () => axios.get('/api/chats/');
export const create = ({ title, user, userIds }) => axios.post('/api/chats/', { title, user, userIds });
export const remove = (id) => axios.delete(`/api/chats/${id}`);
export const enter = ({ id, userIds }) => axios.patch(`/api/chats/${id}`, { userIds });
export const exit = ({ id, userId }) => axios.patch(`/api/chats/${id}/${userId}`);
export const receive = (id) => axios.get(`/api/chats/chatroom/${id}`);
export const send = ({ id, messages }) => axios.patch(`/api/chats/chatroom/${id}`, { messages });