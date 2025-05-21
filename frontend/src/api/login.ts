import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
    user: {
        email,
        password,
    },
    });

    return response.data;
    };

export const getUserInfo = async () => {
    const token = localStorage.getItem('auth_token');
    const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};