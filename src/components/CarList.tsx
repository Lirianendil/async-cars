import React from 'react';
import { Car } from './types'; // Убедитесь, что интерфейс Car импортируется из правильного места

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