import React, { useState } from 'react';
import CarForm from '../components/carForm';

interface Car {
    name: string;
    color: string;
}

const Garage: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);

    const addNewCar = (newCar: Car) => {
        setCars((currentCars) => [...currentCars, newCar]);
    };

    // Render the form and the list of cars
    return (
        <div>
            <CarForm addNewCar={addNewCar} />
            {/* Render cars here */}
            {cars.map((car, index) => (
                <div key={index}>
                    {car.name} - <span style={{ color: car.color }}>{car.color}</span>
                </div>
            ))}
        </div>
    );
};

export default Garage;
