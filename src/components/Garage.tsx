import React, { useState } from 'react';
import CarForm from '../components/carForm';
import CarUpdateForm from '../components/CarUpdateForm';
import '../components/СarUpdate.css';



interface Car {
    id: number;
    name: string;
    color: string;
}

const Garage: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [editingCar, setEditingCar] = useState<Car | null>(null);

    const addNewCar = (newCar: Omit<Car, 'id'>) => {
        const maxId = cars.reduce((max, car) => Math.max(max, car.id), 0);
        const newId = maxId + 1 <= 100 ? maxId + 1 : 1;
        const carWithId = { ...newCar, id: newId };
        setCars((currentCars) => [...currentCars, carWithId]);
    };

    const updateCarList = (updatedCar: Car) => {
        setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
        setEditingCar(null);
    };


    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };


    const getRandomName = () => {
        const makes = ['Tesla', 'BMW', 'Mercedes', 'Ford', 'Chevy', 'Audi', 'Toyota'];
        const models = ['Model S', '3 Series', 'C-Class', 'Focus', 'Camaro', 'A4', 'Camry'];
        const make = makes[Math.floor(Math.random() * makes.length)];
        const model = models[Math.floor(Math.random() * models.length)];
        return `${make} ${model}`;
    };


    const generateRandomCars = () => {
        const randomCars = Array.from({ length: 100 }, (_, index) => ({
            id: Date.now() + index, // Простой способ генерации уникальных ID
            name: getRandomName(),
            color: getRandomColor(),
        }));

        setCars(randomCars);
    };

    return (
        <div>
            <CarForm addNewCar={addNewCar} />
            <button onClick={generateRandomCars}>Generate 100 Random Cars</button>
            {cars.map((car) => (
                <div key={car.id}>
                    {car.name} - <span style={{ color: car.color }}>{car.color}</span>
                    <button onClick={() => setEditingCar(car)}>Edit</button>
                    <button onClick={() => {/* Здесь будет функция удаления */}}>Remove</button>
                </div>
            ))}
            {editingCar && (
                <CarUpdateForm
                    car={editingCar}
                    show={Boolean(editingCar)}
                    onClose={() => setEditingCar(null)}
                    updateCarList={updateCarList}
                />
            )}
        </div>
    );
};

export default Garage;

