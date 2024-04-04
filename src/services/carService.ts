import { Car } from '../components/types'; // Adjust the import path as needed

const BASE_URL = 'http://localhost:3000';

// Use the Car type for the car parameter
export const addCarAPI = async (car: Car) => {
    const response = await fetch(`${BASE_URL}/garage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
    });

    if (!response.ok) {
        throw new Error('Произошла ошибка при добавлении машины');
    }

    return await response.json();
};