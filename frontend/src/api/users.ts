import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at?: string;
    updated_at?: string;
}

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
    return response.data;
};

export const getUser = async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const createUser = async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
    const response = await axios.post<User>(`${API_BASE_URL}/users`, {user : userData});
    return response.data;
};

export const updateUser = async (id: number, userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
    const response = await axios.put<User>(`${API_BASE_URL}/users/${id}`, {user : userData});
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
};
