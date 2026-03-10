import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const getExpenses = async () => {
  const response = await axios.get(`${BASE_URL}/expenses`);
  return response.data;
};

export const getExpenseById = async (id) => {
  const response = await axios.get(`${BASE_URL}/expenses/${id}`);
  return response.data;
};

export const createExpenseAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/expenses`, data);
  return response.data;
};

export const updateExpenseAPI = async (id, data) => {
  const response = await axios.patch(`${BASE_URL}/expenses/${id}`, data);
  return response.data;
};

export const deleteExpenseAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/expenses/${id}`);
  return response.data;
};
