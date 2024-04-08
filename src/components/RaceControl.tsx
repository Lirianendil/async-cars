import React, { useState } from 'react';
import { driveCar, stopEngine } from '../api/api';

interface Car {
    id: number;
    velocity: number;
    distance: number;
    name: string;
    color: string;
}

const RaceControl: React.FC<{ cars: Car[] }> = ({ cars }) => {
    const [raceStatus, setRaceStatus] = useState('stopped');

    const startRace = async () => {
        setRaceStatus('running');
        const racePromises = cars.map(car => driveCar(car.id));

        const results = await Promise.allSettled(racePromises);

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Машина ${cars[index].name} достигла финиша.`);
            } else {
                console.log(`Машина ${cars[index].name} остановилась из-за поломки.`);
            }
        });

        setRaceStatus('stopped');
    };

    const stopRace = async () => {
        setRaceStatus('stopped');
        cars.forEach(async (car: Car) => {
            try {
                const result = await stopEngine(car.id);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        });
    };

    const resetRace = async () => {
        const stopPromises = cars.map(car => stopEngine(car.id));

        await Promise.allSettled(stopPromises);

        console.log('Гонка сброшена, все машины остановлены.');
        setRaceStatus('stopped');
    };

    return (
        <div>
            <button onClick={startRace} disabled={raceStatus === 'running'}>
                Запустить гонку
            </button>
            <button onClick={stopRace} disabled={raceStatus === 'stopped'}>
                Остановить гонку
            </button>
            <button onClick={resetRace}>
                Сбросить гонку
            </button>
        </div>
    );
};

export default RaceControl;
