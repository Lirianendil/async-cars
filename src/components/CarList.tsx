import React from 'react';
import CarItem from './CarItem';
import { Car } from './types';

interface CarListProps {
    cars: Car[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
    return (
        <div>
            {cars.map(car => (
                <CarItem key={car.id} car={car} />
            ))}
        </div>
    );
};

export default CarList;
