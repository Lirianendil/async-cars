import React, {useEffect , useState } from 'react';

// The Car interface as defined previously
interface Car {
    id: number;
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
        // Whenever the selected car changes, update the form state
        setName(car.name);
        setColor(car.color);
    }, [car]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedCar = { ...car, name, color };

        // Call to API to update the car on the server
        const response = await fetch(`http://localhost:3000/garage/${car.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCar),
        });

        if (response.ok) {
            const result = await response.json();
            // If the update is successful, update the car list in the parent component
            updateCarList(result);
            // Close the form
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
