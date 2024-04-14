import axios from "axios";
import {
    Car,
    Winner,
    EngineResponse,
    DriveStatus,
    CarStatusType,
} from "../components/types";

const BASE_URL = "http://127.0.0.1:3000";

export const getCar = async (id: number): Promise<Car> => {
    const response = await axios.get(`${BASE_URL}/garage/${id}`);
    return response.data;
};

export const getCars = async (
    page: number,
    limit: number = 7
): Promise<{ list: Car[]; count: number }> => {
    const response = await axios.get(
        `${BASE_URL}/garage?_page=${page}&_limit=${limit}`
    );

    return { list: response.data, count: response.headers["x-total-count"] };
};

export const createCar = async (car: Omit<Car, "id">): Promise<Car> => {
    try {
        const response = await axios.post(`${BASE_URL}/garage`, car);
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error("Непредвиденный статус ответа: " + response.status);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                "Ошибка при создании автомобиля:",
                error.response?.data || error.message
            );
            alert(
                "Ошибка при создании автомобиля: " +
                (error.response?.data.message || error.message)
            );
        } else {
            console.error("Неожиданная ошибка:", error);
            alert("Неожиданная ошибка при создании автомобиля");
        }
        throw error;
    }
};

export const deleteCar = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/garage/${id}`);
};

export const updateCar = async (
    id: number,
    car: { name: string; color: string }
): Promise<Car> => {
    const response = await axios.put(`${BASE_URL}/garage/${id}`, car);
    return response.data;
};

export const startEngine = async (id: number): Promise<EngineResponse> => {
    const response = await axios.patch(
        `${BASE_URL}/engine?id=${id}&status=started`
    );
    return response.data;
};

export const stopEngine = async (id: number): Promise<EngineResponse> => {
    const response = await axios.patch(
        `${BASE_URL}/engine?id=${id}&status=stopped`
    );
    return response.data;
};

export const startRace = async (cars: Car[]) => {
    const responses = await Promise.all(
        cars.map(async (car: Car) => {
            const response = await startAndDrive(car.id);
            return response as CarStatusType;
        })
    );

    return responses;
};

export const startAndDrive = async (id: number): Promise<CarStatusType> => {
    try {
        const engineRes = await startEngine(id);
        const driveRes = await driveCar(id);

        return {
            id,
            velocity: engineRes.velocity,
            distance: engineRes.distance,
            time: engineRes.distance / engineRes.velocity,
            success: driveRes.success,
        };
    } catch (error) {
        console.log("Error occurred while starting or driving the car:", error);
        return { id, success: false };
    }
};

export const driveCar = async (id: number): Promise<DriveStatus> => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/engine?id=${id}&status=drive`
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const getWinners = async (
    page: number,
    limit: number = 10
): Promise<Winner[]> => {
    const response = await axios.get(
        `${BASE_URL}/winners?_page=${page}&_limit=${limit}`
    );
    return response.data ? response.data : [];
};

export const getWinner = async (id: number): Promise<Winner | null> => {
    try {
        const response = await axios.get(`${BASE_URL}/winners/${id}`);
        return response.data.id ? response.data : null;
    } catch (error) {
        console.error("Error getting winner:", error);
        return null;
    }
};

export const createWinner = async (winner: {
    id: number;
    wins: number;
    time: number;
}): Promise<Winner> => {
    const response = await axios.post(`${BASE_URL}/winners`, winner);
    return response.data;
};

export const updateWinner = async (
    id: number,
    winner: { wins: number; time: number }
): Promise<Winner> => {
    const response = await axios.put(`${BASE_URL}/winners/${id}`, winner);
    return response.data;
};

export const createOrUpdateWinner = async (winner: {
    id: number;
    time: number;
}) => {
    try {
        const oldWinner = await getWinner(winner.id);

        if (!oldWinner || !oldWinner.id) {
            try {
                const newWinner = await axios.post(`${BASE_URL}/winners`, {
                    ...winner,
                    wins: 1,
                });
                return newWinner.data;
            } catch (error) {
                throw new Error("Error creating new winner");
            }
        } else {
            try {
                const updatedWinner = await axios.put(
                    `${BASE_URL}/winners/${winner.id}`,
                    {
                        ...winner,
                        wins: oldWinner.wins + 1,
                    }
                );
                return updatedWinner.data;
            } catch (error) {
                throw new Error("Error updating existing winner");
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error updating winner data");
    }
};

export const deleteWinner = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/winners/${id}`);
};