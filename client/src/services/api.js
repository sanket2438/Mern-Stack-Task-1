import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchTransactions = (params) =>
  axios.get(`${API_BASE_URL}/transactions`, { params });
export const fetchStatistics = (month) =>
  axios.get(`${API_BASE_URL}/transactions/statistics`, { params: { month } });
export const fetchBarChart = (month) =>
  axios.get(`${API_BASE_URL}/transactions/bar-chart`, { params: { month } });
export const fetchPieChart = (month) =>
  axios.get(`${API_BASE_URL}/transactions/pie-chart`, { params: { month } });
export const fetchCombined = (month) =>
  axios.get(`${API_BASE_URL}/transactions/combined`, { params: { month } });
