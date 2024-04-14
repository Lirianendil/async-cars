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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
            <div style={{display: 'flex', justifyContent: 'space-between', width: 'auto', alignItems: 'center', flexDirection: "column" }}>
                <div style={{display:"flex"}}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name of the car"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: '10px', marginRight: '10px', width: '300px' }}
                    />
                    <input
                        type="color"
                        name="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ marginBottom: '5px', marginRight: '20px', width: '60px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100px' }}>Create</button>
            </div>
        </form>
    );
};

export default CarForm;