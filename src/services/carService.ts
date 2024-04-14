import { Car } from "../components/types";

const BASE_URL = "http://localhost:3000";

export const addCarAPI = async (car: Car) => {
    const response = await fetch(`${BASE_URL}/garage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
    });

    if (!response.ok) {
        throw new Error("Произошла ошибка при добавлении машины");
    }
    if (!response.headers.get("Content-Type")?.includes("application/json")) {
        throw new Error(await response.text());
    }

    return await response.json();
};