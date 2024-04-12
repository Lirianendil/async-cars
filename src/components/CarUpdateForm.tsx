import React, {useEffect , useState } from 'react';
import '../components/СarUpdate.css'


export interface Car {
    id: number;
    velocity?: number,
    distance?: number
    name: string;
    color: string;
}


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

        try {
            const response = await fetch(`http://localhost:3000/garage/${car.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCar),
            });

            if (!response.ok) {
                throw new Error('Failed to update the car with status: ' + response.status);
            }

            const result = await response.json();
            updateCarList(result);
            onClose();
        } catch (error) {
            console.error('Failed to update the car:', error);
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
