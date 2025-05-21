import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // クッキーの送受信を有効化
    headers: {
        'Content-Type': 'application/json'
    }
});

interface LoginResponse {
    user: {
    email: string;
    name: string;
    }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>('/authentication/login', {
        user: { email, password }
        });
        return response.data;
        } catch (error) {
        console.error('ログインリクエストエラー:', error);
        throw error;
        }
    };

/**
   * ユーザーのログアウト処理を行う
*/
export const logout = async (): Promise<void> => {
    try {
    await apiClient.delete('/authentication/logout');
    } catch (error) {
    console.error('ログアウトリクエストエラー:', error);
    throw error;
    }
};

export const checkAuth = async (): Promise<boolean> => {
    try {
        await apiClient.get('/authentication/check');
        return true;
        } catch (error) {
        return false;
        }
};