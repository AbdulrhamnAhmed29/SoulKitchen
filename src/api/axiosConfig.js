import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// interceptor requests 
api.interceptors.request.use((config) => {
  const token = Cookies.get('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// interceptor response 
api.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  if (error.response?.status === 401) {
    Cookies.remove('jwt'); 
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;