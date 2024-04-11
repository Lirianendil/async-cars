import React, { useState } from 'react';
import { stopEngine } from '../api/api';

interface Car {
    id: number;
    velocity?: number;
    distance?: number;
    name: string;
    color: string;
}

const RaceControl: React.FC<{ cars: Car[] }> = ({ cars }) => {
    const [raceStatus, setRaceStatus] = useState<'stopped' | 'running'>('stopped');

    const resetRace = async () => {
        setRaceStatus('stopped'); // Установка статуса гонки в "stopped"
        const stopPromises = cars.map(car => stopEngine(car.id));
        await Promise.all(stopPromises);
    };

    return (
        <div>
            <button onClick={resetRace}>Сбросить гонку</button>
        </div>
    );
};

export default RaceControl;
