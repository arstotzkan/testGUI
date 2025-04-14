import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5174',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
