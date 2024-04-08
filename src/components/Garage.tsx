import React, { useState, useEffect } from 'react';
import CarForm from '../components/carForm';
import CarUpdateForm from '../components/CarUpdateForm';
import CarList from '../components/CarList';
import RaceControl from '../components/RaceControl';
import { getCars, createCar, startAndDrive, updateCar } from '../api/api';
import '../components/СarUpdate.css';
import { Car } from './types';

const Garage: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 7;

    useEffect(() => {
        const fetchCars = async () => {
            const carsData = await getCars(currentPage);
            setCars(carsData);
        };

        fetchCars();
    }, [currentPage]);

    // Функция для добавления новой машины
    const addNewCar = async (newCarData: Omit<Car, 'id'>) => {
        // предполагается, что createCar принимает объект без id и возвращает полный объект Car после добавления
        const newCar = await createCar(newCarData);
        // Добавить машину в состояние после успешного создания
        setCars(prevCars => [...prevCars, newCar]);
    };
    // Функция для обновления информации о машине
    const updateCarList = async (carToUpdate: Car) => {
        const updatedCar = await updateCar(carToUpdate.id, { name: carToUpdate.name, color: carToUpdate.color });
        setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
    };

    // Обновленная функция для генерации новых машин
    const generateRandomCars = async () => {
        const brands = ['Tesla', 'BMW', 'Mercedes', 'Ford', 'Chevrolet', 'Audi', 'Toyota'];
        for (let i = 0; i < 100; i++) {
            const brand = brands[Math.floor(Math.random() * brands.length)];
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
            const velocity = Math.max(50, Math.random() * 200);
            const distance = 0; // Устанавливаем расстояние по умолчанию
            // Создаем объект типа Car без id
            const newCarData: Omit<Car, "id"> = { name: `${brand} Model`, color, velocity, distance };
            // Передаем объект в функцию addNewCar
            await addNewCar(newCarData);
        }
        // Обновляем список машин после генерации
        await fetchCars();
    };
    const fetchCars = async () => {
        const carsData = await getCars(currentPage);
        setCars(carsData);
    };

    // В Garage.tsx
    const startAllCars = async () => {
        for (const car of cars) {
            await startAndDrive(car.id);
        }
    };

    return (
        <div>
            <CarForm addNewCar={addNewCar} />
            <button onClick={generateRandomCars}>Generate 100 Random Cars</button>
            {editingCar && <CarUpdateForm car={editingCar} show={Boolean(editingCar)} onClose={() => setEditingCar(null)} updateCarList={updateCarList} />}
            <CarList cars={cars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage)} />
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                <span>Page {currentPage} of {Math.ceil(cars.length / carsPerPage)}</span>
                <button disabled={currentPage === Math.ceil(cars.length / carsPerPage)} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
            <div>
                <h2>Start All Cars</h2>
                <button onClick={startAllCars}>Start All Cars</button>
            </div>
            <RaceControl cars={cars} />
        </div>
    );
};

export default Garage;
