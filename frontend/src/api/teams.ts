import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface Team {
    id: number;
    name: string;
    owner_id: number;
    created_at : Date;
    updated_at : Date;
}

export type TeamUpdateInput = Omit<Team, 'created_at' | 'updated_at' | 'id'>

export const getTeams = async (): Promise<Team[]> => {
    const response = await axios.get<Team[]>(`${API_BASE_URL}/teams`);
    return response.data;
};

export const getTeam = async (id: number): Promise<Team> => {
    const response = await axios.get<Team>(`${API_BASE_URL}/teams/${id}`);
    return response.data;
};

export const createTeam = async (teamData: Omit<Team, 'id' | 'created_at' | 'updated_at'>): Promise<Team> => {
    const response = await axios.post<Team>(`${API_BASE_URL}/teams`, {team : teamData});
    return response.data;
};

export const updateTeam = async (id: number, teamData: Omit<Team, 'id'| 'created_at' | 'updated_at'>): Promise<Team> => {
    const response = await axios.put<Team>(`${API_BASE_URL}/teams/${id}`, {team : teamData});
    return response.data;
};

export const deleteTeam = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/teams/${id}`);
};
