import React from "react";
import CarItem from "./CarItem";
import { Car, CarStatusType } from "./types";

interface CarListProps {
    cars: Car[];
    carStatusList: CarStatusType[];
    onSelect: (car: Car) => void;
    onRemove?: (id: number) => void;
    fetchCars: () => void
}

const CarList: React.FC<CarListProps> = ({ cars, carStatusList, fetchCars, onSelect, onRemove }) => {
    return (
        <div className="car-list">
            {cars.map((car) => (
                <CarItem
                    key={car.id}
                    car={car}
                    onSelect={onSelect}
                    fetchCars={fetchCars}
                    carStatus={
                        carStatusList.find((el) => el.id === car.id) as CarStatusType
                    }
                />
            ))}
        </div>
    );
};

export default CarList;