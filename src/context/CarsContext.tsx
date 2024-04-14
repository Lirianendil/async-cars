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
                // Here you could update the UI or provide feedback to the user
            } else {
                console.error('Failed to start engine for car:', car.id);
            }
        } catch (error) {
            // Using type assertion to narrow down the type of the error
            if (error instanceof Error) {
                // Now it's safe to access the error.message property
                console.error('Error occurred while starting or driving the car:', error.message);
            } else {
                // Handle non-Error objects or unknown errors
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