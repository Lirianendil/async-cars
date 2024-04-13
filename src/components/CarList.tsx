import React from 'react';
import CarItem from './CarItem';
import { Car } from './types';
import carItem from "./CarItem";
import './СarUpdate.css';

interface CarListProps {
    cars: Car[];
    onSelect: (car: Car) => void;
}

const CarList: React.FC<CarListProps> = ({ cars, onSelect }) => {
    return (
        <div>
            {cars.map(car => (
                <div className="car-road">
                    <CarItem key={car.id} car={car} onSelect={onSelect} carDistance={(car.distance/car.velocity)}/>

                </div>
            ))}
        </div>
    );
};

export default CarList;
