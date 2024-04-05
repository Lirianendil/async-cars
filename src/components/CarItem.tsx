import React from 'react';
import { Car } from './types';

interface CarItemProps {
    car: Car;
}

const CarItem: React.FC<CarItemProps> = ({ car }) => {
    return (
        <div className="car-item">
            <span>{car.name}</span>
            <div className="car-color" style={{ backgroundColor: car.color }}></div>
            {/* Опциональные кнопки для редактирования и удаления */}
        </div>
    );
};

export default CarItem;