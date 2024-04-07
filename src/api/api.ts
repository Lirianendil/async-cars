import axios from 'axios';
import { Car, Winner, EngineResponse, DriveStatus } from '../components/types';


const BASE_URL = 'http://localhost:3000'; // Адрес вашего API

export const getCar = async (id: number): Promise<Car> => {
    const response = await axios.get(`${BASE_URL}/garage/${id}`);
    return response.data;
};

export const getCars = async (page: number, limit: number = 10): Promise<Car[]> => {
    const response = await axios.get(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`);
    return response.data;
};

export const createCar = async (car: { name: string, color: string }): Promise<Car> => {
    const response = await axios.post(`${BASE_URL}/garage`, car);
    return response.data;
};

export const deleteCar = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/garage/${id}`);
};

export const updateCar = async (id: number, car: { name: string, color: string }): Promise<Car> => {
    const response = await axios.put(`${BASE_URL}/garage/${id}`, car);
    return response.data;
};

export const startEngine = async (id: number): Promise<EngineResponse> => {
    const response = await axios.patch(`${BASE_URL}/engine?id=${id}&status=started`);
    return response.data;
};

export const stopEngine = async (id: number): Promise<EngineResponse> => {
    const response = await axios.patch(`${BASE_URL}/engine?id=${id}&status=stopped`);
    return response.data;
};

export const driveCar = async (id: number): Promise<DriveStatus> => {
    try {
        const response = await axios.patch(`${BASE_URL}/engine?id=${id}&status=drive`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Handle the specific error response here if needed
            return error.response.data;
        }
        throw error; // If it's not an AxiosError, rethrow it
    }
};

export const getWinners = async (page: number, limit: number = 10): Promise<Winner[]> => {
    const response = await axios.get(`${BASE_URL}/winners?_page=${page}&_limit=${limit}`);
    return response.data;
};

export const getWinner = async (id: number): Promise<Winner> => {
    const response = await axios.get(`${BASE_URL}/winners/${id}`);
    return response.data;
};

export const createWinner = async (winner: { id: number, wins: number, time: number }): Promise<Winner> => {
    const response = await axios.post(`${BASE_URL}/winners`, winner);
    return response.data;
};

export const updateWinner = async (id: number, winner: { wins: number, time: number }): Promise<Winner> => {
    const response = await axios.put(`${BASE_URL}/winners/${id}`, winner);
    return response.data;
};

export const deleteWinner = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/winners/${id}`);
};
export const resetRace = async (): Promise<void> => {
    try {
        const response = await axios.post(`${BASE_URL}/reset-race`);
        if (response.status === 200) {
            console.log('Гонка сброшена');
        } else {
            console.error('Ошибка сброса гонки:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка сброса гонки:', error);
        throw error;
    }
};

// Обновляем функцию startRace для принятия аргумента speed
export const startRace = async (speed: number): Promise<void> => {
    try {
        const response = await axios.patch(`${BASE_URL}/start-race?speed=${speed}`);
        if (response.status === 200) {
            console.log('Гонка начата для всех машин');
        } else {
            console.error('Ошибка запуска гонки:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка запуска гонки:', error);
        throw error;
    }
};
