import React from 'react';
import CarItem from './CarItem';
import { Car } from './types';

interface CarListProps {
    cars: Car[];
    onSelect: (car: Car) => void; // Добавьте эту строку
}

const CarList: React.FC<CarListProps> = ({ cars, onSelect }) => { // Добавьте onSelect в параметры
    return (
        <div>
            {cars.map(car => (
                <CarItem key={car.id} car={car} onSelect={onSelect} /> // Добавьте onSelect как prop в CarItem
            ))}
        </div>
    );
};

export default CarList;
