import React from 'react';
import { Car as CarType } from '../components/types';
import { startEngine } from '../api/api';

interface Props {
    car: CarType;
    onUpdate: (id: number) => void;
    onRemove: (id: number) => void;
}

const Car: React.FC<Props> = ({ car, onUpdate, onRemove }) => {
    const handleStart = async () => {
        try {
            const { velocity, distance } = await startEngine(car.id);
            console.log(velocity, distance);
            // Handle the engine start here...
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h2>{car.name}</h2>
            <div style={{ backgroundColor: car.color }}>Color Display</div>
            <button onClick={() => onUpdate(car.id)}>Edit</button>
            <button onClick={() => onRemove(car.id)}>Remove</button>
            <button onClick={handleStart}>Start Engine</button>
            {/* Add Stop Engine button and handleStop function */}
        </div>
    );
};

export default Car;
