import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface Task {
    id: number;
    title: string;
    body: string;
    status: number;
    assignee_id: number;
    created_at : Date;
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
    return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
    const response = await axios.get<Task>(`${API_BASE_URL}/teams/${id}`);
    return response.data;
};

export const createTask = async (taskData: Omit<Task, 'id' | 'updated_at' | 'created_at' | 'updated_at'>): Promise<Task> => {
    const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, {task : taskData});
    return response.data;
};

export const updateTask = async (id: number, taskData: Omit<Task, 'id'>): Promise<Task> => {
    const response = await axios.put<Task>(`${API_BASE_URL}/tasks/${id}`, {task : taskData});
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
};
