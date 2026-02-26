import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// انترسبتور الطلب: بيجيب التوكن من الكوكيز ويبعتها
api.interceptors.request.use((config) => {
  const token = Cookies.get('jwt'); // بنسمي الكوكي jwt مثلاً
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// انترسبتور الرد: لو حصل 401 بيمسح الكوكي
api.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  if (error.response?.status === 401) {
    Cookies.remove('jwt'); // مسح الكوكي
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;