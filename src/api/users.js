// src/api/users.js
import axios from 'axios';

const BASE_URL = 'https://63a9bccb7d7edb3ae616b639.mockapi.io/users';

export const fetchUsers = () => axios.get(BASE_URL);
export const fetchUserById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createUser = (data) => axios.post(BASE_URL, data);
export const updateUser = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/${id}`);
