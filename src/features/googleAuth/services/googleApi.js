import axios from 'axios';

const API_URL = "http://localhost:1337/api";

export const getStrapiUser = async (accessToken) => {
    const response = await axios.get(`${API_URL}/auth/google/callback?access_token=${accessToken}`);
    
    return response.data; // { jwt, user }
};