import axios from 'axios';
import { Car, Winner, EngineResponse, DriveStatus } from '../components/types';

const BASE_URL = 'http://127.0.0.1:3000';

export const getCar = async (id: number): Promise<Car> => {
    const response = await axios.get(`${BASE_URL}/garage/${id}`);
    return response.data;
};
export const getCars = async (): Promise<Car[]> => {
    const response = await axios.get(`${BASE_URL}/garage`);
    return response.data;
};
export const createCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
    try {
        const response = await axios.post(`${BASE_URL}/garage`, car);
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error('Непредвиденный статус ответа: ' + response.status);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка при создании автомобиля:', error.response?.data || error.message);
            alert('Ошибка при создании автомобиля: ' + (error.response?.data.message || error.message));
        } else {
            console.error('Неожиданная ошибка:', error);
            alert('Неожиданная ошибка при создании автомобиля');
        }
        throw error;
    }
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

    export const startAndDrive = async (id: number): Promise<any> => {
        try {
            const engineRes = await startEngine(id);
            const carDriveRes = await driveCar(id);

            return {success: true, engineRes, carDriveRes}; // Возвращаем true в случае успешного запуска и движения
        } catch (error) {
            console.error('Error occurred while starting or driving the car:', error);
            return false; // Возвращаем false в случае ошибки
        }
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
