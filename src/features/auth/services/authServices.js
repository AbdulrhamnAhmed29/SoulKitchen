import Cookies from 'js-cookie';
import api from '../../../api/axiosConfig';

export const authService = {
  // 1.(Login)
  login: async (data) => {
    const response = await api.post('/auth/local', data);
    return response;
  },

  // 2.(Register)
  register: async (data) => {
    const response = await api.post('/auth/local/register', data);
    return response;
  },

  // 3.(Logout)
  logout: () => {
    Cookies.remove('jwt');
    localStorage.removeItem('user');
    window.location.href = '/signin';
    localStorage.removeItem("userId")
  },
  // 4.(Check Auth)
  isAuthenticated: () => {
    const token = Cookies.get('jwt');
    return !!token;
  }
};