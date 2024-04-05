import React, { useState } from 'react';
import CarForm from '../components/carForm';
import CarUpdateForm from '../components/CarUpdateForm';
import CarList from '../components/CarList';
import './СarUpdate.css'

interface Car {
    id: number;
    name: string;
    color: string;
}

const Garage: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 7;

    const pageCount = Math.ceil(cars.length / carsPerPage);
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

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

    const changePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= pageCount) {
            setCurrentPage(newPage);
        }
    };

    const generateRandomCars = () => {
        const randomCars = Array.from({ length: 100 }, (_, index) => ({
            id: Date.now() + index,
            name: `Car ${index}`,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        }));

        setCars(randomCars);
    };

    return (
        <div>
            <CarForm addNewCar={addNewCar} />
            <button onClick={generateRandomCars}>Generate 100 Random Cars</button>
            <CarList cars={currentCars} />
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>Prev</button>
                <span>Page {currentPage} of {pageCount}</span>
                <button disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>Next</button>
            </div>
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
