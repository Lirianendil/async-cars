import React, { useState } from 'react';
import '../components/СarUpdate.css';

interface Car {
    id: number;
    name: string;
    color: string;
    speed: number;
}

interface CarFormProps {
    addNewCar: (newCar: Omit<Car, 'id'> & { speed: number }) => void;
}

const CarForm: React.FC<CarFormProps> = ({ addNewCar }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Fetch request to add new car
            const response = await fetch('http://localhost:3000/garage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, color }),
            });
            if (response.ok) {
                const newCar: Omit<Car, 'id'> & { speed: number } = await response.json();
                addNewCar({ ...newCar, speed: 0 });
                setName('');
                setColor('');
            }
        } catch (error) {
            console.error(error);
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
            <div className="button-container">
                <button className="button button-create" type="submit">Create</button>
            </div>
        </form>
    );
};

export default CarForm;
