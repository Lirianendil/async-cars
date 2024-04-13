import React, { useState, useEffect } from 'react';
import CarForm from '../components/carForm';
import CarUpdateForm from '../components/CarUpdateForm';
import CarList from '../components/CarList';
import RaceControl from '../components/RaceControl';
import { getCars, createCar, startAndDrive, updateCar } from '../api/api';
import '../components/СarUpdate.css';
import { Car } from './types';
import './СarUpdate.css';

const Garage: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 7;
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const carsData = await getCars();
            setCars(carsData);
        } catch (error) {
            console.error('Failed to fetch cars:', error);
        }
    };

    const addNewCar = async (carData: Omit<Car, 'id'>) => {
        try {
            const newCar = await createCar(carData);
            setCars(prevCars => [...prevCars, newCar]);
            fetchCars();
        } catch (error) {
            console.error('Failed to add new car:', error);
        }
    };

    const updateCarList = async (carToUpdate: Car) => {
        try {
            const updatedCar = await updateCar(carToUpdate.id, { name: carToUpdate.name, color: carToUpdate.color });
            setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
            fetchCars();
        } catch (error) {
            console.error('Failed to update car:', error);
        }
    };

    const generateRandomCars = async () => {
        const brands = ['Tesla', 'BMW', 'Mercedes', 'Ford', 'Chevrolet', 'Audi', 'Toyota'];
        const targetCarCount = 100;
        const currentCarCount = cars.length;
        const carsToAdd = targetCarCount - currentCarCount;

        if (carsToAdd > 0) {
            for (let i = 0; i < carsToAdd; i++) {
                const brand = brands[Math.floor(Math.random() * brands.length)];
                const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                const newCarData: Omit<Car, "id"> = {
                    name: `${brand} Model ${i + 1}`, color, velocity: Math.max(50, Math.random() * 200), distance: 0
                };
                await addNewCar(newCarData);
            }
        } else {
            console.log("The garage already has 100 or more cars.");
        }

        await fetchCars();
    };

    const startAllCars = async () => {
        for (const car of cars) {
            try {
               const response = await startAndDrive(car.id);
               car.distance = response.engineRes.distance;
               car.velocity = response.engineRes.velocity;
            } catch (error) {
                console.error('Failed to start car:', error);
            }
        }
    };

    const handleSelectCar = (car: Car) => {
        setSelectedCar(car);
    };

    return (
        <div className="garage">
            <CarForm addNewCar={addNewCar} />
            <button onClick={generateRandomCars}>Generate 100 Random Cars</button>
            {selectedCar && <CarUpdateForm car={selectedCar} show={Boolean(selectedCar)} onClose={() => setSelectedCar(null)} updateCarList={updateCarList} />}
            <CarList cars={cars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage)} onSelect={handleSelectCar} />
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