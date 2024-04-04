import React, { useState } from 'react';

interface Car {
    name: string;
    color: string;
}

interface CarFormProps {
    addNewCar: (newCar: Car) => void;
}

const CarForm: React.FC<CarFormProps> = ({ addNewCar }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/garage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, color }),
            });
            if (response.ok) {
                const newCar: Car = await response.json();
                addNewCar(newCar); // Using the addNewCar prop to add the car to the garage state
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
            <button type="submit">Add Car</button>
        </form>
    );
};

export default CarForm;
