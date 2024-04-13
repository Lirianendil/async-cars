import React, { useState, useEffect } from 'react';
import './СarUpdate.css';
import CarComponent from "./CarComponent";
import { Car as CarType } from './types';


interface CarItemProps {
    car: CarType;
    onSelect: (car: CarType) => void;
    carDistance: number;
}

const CarItem: React.FC<CarItemProps> = ({ car, onSelect, carDistance }) => {
    const [engineStatus, setEngineStatus] = useState<'stopped' | 'started' | 'driving'>('stopped');
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        if (car) {
            setEngineStatus('stopped');
        }
    }, [car]);

    const handleEngineAction = async (action: 'start' | 'stop' | 'drive' | 'started') => {
        try {
            if (!car) {
                console.error('Car information is not available');
                return;
            }

            const response = await fetch(`http://localhost:3000/engine?id=${car.id}&status=${action}`, {
                method: 'PATCH',
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                car.velocity = data.velocity;
                car.distance = data.distance;
                if (response.status >= 400) {
                    throw new Error(data.message);
                }
            } else {
                const data = await response.text();
                throw new Error(data);
            }

            if (action === 'started' || action === 'drive') {
                setEngineStatus('driving');
            } else {
                car.distance = 0;
                car.velocity = 0;
                setEngineStatus('stopped');
            }
        } catch (error) {
            console.error(`Failed to ${action} the engine: `, error);
            setEngineStatus('stopped');
        }
    };

    return (
        <div className={`car-item ${engineStatus === 'driving' ? 'car-moving' : ''}`} >
            {car.distance}
            <div  style={{ transform: `translateX(${(car?.distance / car?.velocity)}px)`, transition: 'transform 2s linear' }}>
                <CarComponent color={car.color} />
            </div>
            <div>
                <button
                    onClick={() => handleEngineAction('started')}
                    disabled={engineStatus !== 'stopped'}>
                    Start Engine
                </button>

                <button
                    onClick={() => handleEngineAction('stop')}
                    disabled={engineStatus === 'stopped'}>
                    Stop Engine
                </button>
                <button onClick={() => onSelect(car)}>Выбрать</button>
            </div>
        </div>
    );
};

export default CarItem;
