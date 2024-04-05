import React from 'react';
import { Car as CarType } from '../components/types';
import { startEngine } from '../api/api';
import '../components/СarUpdate.css'

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
            <div className="button-container">
                <button className="button button-edit" onClick={() => onUpdate(car.id)}>Update</button>
                <button className="button" onClick={() => onRemove(car.id)}>Remove</button>
                <button className="button" onClick={handleStart}>Start Engine</button>
                {/*"Stop Engine" */}
                {/* <button className="button" onClick={handleStop}>Stop Engine</button> */}
            </div>
        </div>
    );
};

export default Car;
