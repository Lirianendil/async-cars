// CarItem.tsx
import React from 'react';
import { Car } from './types'; // Предположим, что types.ts находится в папке выше

interface CarItemProps {
    car: Car;
}

const CarItem: React.FC<CarItemProps> = ({ car }) => {
    return (
        <div className="car-item">
            <span>{car.name}</span>
            <div className="car-color" style={{ backgroundColor: car.color }}></div>
            {/* Здесь могут быть кнопки для редактирования и удаления */}
        </div>
    );
};

export default CarItem;
