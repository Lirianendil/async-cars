import React, { useEffect, useState } from 'react';
import '../components/СarUpdate.css';
import { Car } from './types';

interface CarUpdateFormProps {
    car: Car;
    show: boolean;
    onClose: () => void;
    updateCarList: (updatedCar: Car) => void;
}

const CarUpdateForm: React.FC<CarUpdateFormProps> = ({ car, show, onClose, updateCarList }) => {
    const [name, setName] = useState(car.name);
    const [color, setColor] = useState(car.color);

    useEffect(() => {
        setName(car.name);
        setColor(car.color);
    }, [car]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedCar = { ...car, name, color };

        const response = await fetch(`http://localhost:3000/garage/${car.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCar),
        });

        if (response.ok) {
            const result: Car = await response.json(); // Assuming the response is the updated car object
            updateCarList(result);
            onClose();
        } else {
            console.error('Failed to update the car');
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="update-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Car Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Car Color:
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CarUpdateForm;
