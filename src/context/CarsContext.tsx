import React from 'react';
import { Car as CarType } from '../components/types';
import { startAndDrive } from '../api/api';
import '../components/СarUpdate.css'

interface Props {
    car: CarType;
    onUpdate: (id: number) => void;
    onRemove: (id: number) => void;
}

const Car: React.FC<Props> = ({ car, onUpdate, onRemove }) => {
    const handleStart = async () => {
        try {
            const {success} = await startAndDrive(car.id);
            if (success) {
                console.log('Engine started successfully');
            } else {
                console.error('Failed to start engine for car:', car.id);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error occurred while starting or driving the car:', error.message);
            } else {
                console.error('An unknown error occurred while starting or driving the car:', error);
            }
        }
    };

    return (
        <div>
            <h2>{car.name}</h2>
            <div style={{ backgroundColor: car.color }}>Color Display</div>
            <div className="button-container">
                <button className="button button-edit" onClick={() => onUpdate(car.id)}>Update</button>
                <button className="button" onClick={() => onRemove(car.id)}>Remove</button>
                <button className="button" onClick={handleStart}>Start Engine</button>
            </div>
        </div>
    );
};

export default Car;