import React, { useState, useEffect } from "react";
import CarUpdateForm from "../components/CarUpdateForm";
import CarList from "../components/CarList";
import {
    getCars,
    createCar,
    updateCar,
    stopEngine,
    startRace,
    createOrUpdateWinner,
} from "../api/api";
import {Car, CarStatusType, WinnerType} from "../components/types";
import { findWinner } from "../utils/findWinner";
import CarForm from "../components/CarForm";
import {formatTime} from "../utils/formatTime";

const Garage: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [editingCar, setEditingCar] = useState<Car | null>(null);

    const [carStatusList, setCarStatusList] = useState<CarStatusType[]>([]);
    const [raceIsStarted, setRaceIsStarted] = useState<boolean>(false);
    const [raceIsLoading, setRaceIsLoading] = useState<boolean>(false);
    const [winnerCar, setWinnerCar] = useState<WinnerType | null>();

    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 7;
    const [pages, setPages] = useState<number>(1);

    const [winnerModalIsOpen, setWinnerModalIsOpen] = useState(false);

    const fetchCars = async () => {
        const carsData = await getCars(currentPage);
        console.log("carsData ===> ", carsData);

        setCars(carsData.list);
        setPages(carsData.count);
    };

    useEffect(() => {
        const fetchCars = async () => {
            const carsData = await getCars(currentPage);
            console.log("carsData ===> ", carsData);

            setCars(carsData.list);
            setPages(carsData.count);
        };

        fetchCars();
    }, [currentPage]);

    const addNewCar = async (newCarData: Omit<Car, "id">) => {
        await createCar(newCarData);
        await fetchCars()
    };

    const updateCarList = async (carToUpdate: Car) => {
        const updatedCar = await updateCar(carToUpdate.id, {
            name: carToUpdate.name,
            color: carToUpdate.color,
        });
        setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
    };

    const generateRandomCars = async () => {
        const brands = [
            "Tesla",
            "BMW",
            "Mercedes",
            "Ford",
            "Chevrolet",
            "Audi",
            "Toyota",
        ];

        for (let i = 0; i < 100; i++) {
            const brand = brands[Math.floor(Math.random() * brands.length)];

            const color =
                "#" +
                Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, "0");

            const newCarData: Omit<Car, "id"> = {
                name: `${brand} Model ${i + 1}`,
                color,
            };

            await addNewCar(newCarData);
        }

        await fetchCars();
    };

    const startAllCars = async () => {
        try {
            setRaceIsLoading(true);

            const responses = await startRace(cars);

            setCarStatusList((prevList) => [...prevList, ...responses]);

            const validResponses = responses.filter(
                (response) => response.time !== undefined && response.success
            );

            if (validResponses.length === 0) {
                throw new Error("No valid responses found.");
            }

            const winner = findWinner(validResponses, cars);

            await createOrUpdateWinner({ id: winner.id,   time: formatTime(winner.time), });

            setTimeout(() => {
                setWinnerCar(winner);
                setWinnerModalIsOpen(true);
            }, winner.time);

            setRaceIsLoading(false);
            setRaceIsStarted(true);
        } catch (error) {
            throw new Error("Could not start race");
        }
    };

    const stopRace = async () => {
        await Promise.all(
            cars.map(async (car) => {
                await stopEngine(car.id);
            })
        );
        setRaceIsStarted(false);
        setCarStatusList([]);
        setWinnerCar(null);
    };

    const [selectedCar, setSelectedCar] = useState<Car | null>(null);

    const handleSelectCar = (car: Car) => {
        setSelectedCar(car);
    };

    return (
        <>
            {raceIsLoading && (
                <div className="race_loading-modal">the race is about to start</div>
            )}
            {winnerModalIsOpen && winnerCar && winnerCar.id && winnerCar.time && (
                <div className="winner-modal">
                    The winner is the car #{winnerCar.id} {winnerCar.name} <br /> the time is{" "}
                    {formatTime(winnerCar.time)} s
                    <button onClick={() => setWinnerModalIsOpen(false)}>Close</button>
                </div>
            )}

            <div>
                <CarForm addNewCar={addNewCar} />
                <button onClick={generateRandomCars}>Generate 100 Random Cars</button>
                {selectedCar && (
                    <CarUpdateForm
                        car={selectedCar}
                        show={Boolean(selectedCar)}
                        onClose={() => setSelectedCar(null)}
                        updateCarList={updateCarList}
                    />
                )}
                {editingCar && (
                    <CarUpdateForm
                        car={editingCar}
                        show={Boolean(editingCar)}
                        onClose={() => setEditingCar(null)}
                        updateCarList={updateCarList}
                    />
                )}
                <CarList
                    onSelect={handleSelectCar}
                    cars={cars}
                    carStatusList={raceIsStarted ? carStatusList : []}
                    fetchCars={fetchCars}
                />
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Prev
                    </button>
                    <span>
            Page {currentPage} of {Math.ceil(pages / carsPerPage)}
          </span>
                    <button
                        disabled={currentPage === Math.ceil(pages / carsPerPage)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
                <div>
                    <h2>Start All Cars</h2>
                    <button onClick={startAllCars}>Start All Cars</button>
                    <button onClick={stopRace}>Stop the race</button>
                </div>
            </div>
        </>
    );
};

export default Garage;