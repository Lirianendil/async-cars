import React, { useState } from "react";

export interface Car {
    id: number;
    velocity?: number;
    distance?: number;
    name: string;
    color: string;
}

interface CarFormProps {
    addNewCar: (newCar: Omit<Car, "id">) => Promise<void>;
}
const CarForm: React.FC<CarFormProps> = ({ addNewCar }) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCar = { name, color };
        try {
            await addNewCar(newCar);
            setName("");
            setColor("");
        } catch (error) {
            console.error("Failed to create new car:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name of the car"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="color"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <button type="submit">Create</button>
        </form>
    );
};

export default CarForm;