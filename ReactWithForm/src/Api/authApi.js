import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const authApi = axios.create({
    baseURL: API_BASE_URL,
});

export const register = async (data) => {
    const response = await authApi.post('/auth/register', data);
    return response.data;
};

export const login = async (data) => {
    const response = await authApi.post('/auth/login', data);
    return response.data;
};

export default { register, login };
