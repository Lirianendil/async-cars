import React, { useState } from 'react';
import CarForm from '../components/carForm';
import CarUpdateForm from '../components/CarUpdateForm'; // Убедитесь, что путь к компоненту правильный

// Измените интерфейс Car, если он находится в другом файле, убедитесь, что он импортирован
interface Car {
    id: number; // Убедитесь, что `id` теперь обязательный параметр
    name: string;
    color: string;
}

const Garage: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [editingCar, setEditingCar] = useState<Car | null>(null);

    const addNewCar = (newCar: Omit<Car, 'id'>) => {
        const maxId = cars.reduce((max, car) => Math.max(max, car.id), 0);
        const newId = maxId + 1 <= 100 ? maxId + 1 : 1; // Простая логика генерации ID
        const carWithId = { ...newCar, id: newId };
        setCars((currentCars) => [...currentCars, carWithId]);
    };

    const updateCarList = (updatedCar: Car) => {
        setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
        setEditingCar(null); // Скрыть форму после обновления
    };

    // Добавьте handleEdit здесь, если вы хотите использовать его для установки editingCar

    return (
        <div>
            <CarForm addNewCar={addNewCar} />
            {cars.map((car) => (
                <div key={car.id}>
                    {car.name} - <span style={{ color: car.color }}>{car.color}</span>
                    <button onClick={() => setEditingCar(car)}>Edit</button>
                    <button onClick={() => {/* Функция удаления */}}>Remove</button>
                </div>
            ))}
            {editingCar && <CarUpdateForm car={editingCar} show={Boolean(editingCar)} onClose={() => setEditingCar(null)} updateCarList={updateCarList} />}
        </div>
    );
};

export default Garage;
