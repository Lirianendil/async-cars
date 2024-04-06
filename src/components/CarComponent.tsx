import React from 'react';
import { ReactComponent as CarSvg } from '../images/1918554.svg'
import './СarUpdate.css';

interface CarComponentProps {
    color: string;
}

const CarComponent: React.FC<CarComponentProps> = ({ color }) => {
    return <CarSvg className="car-svg" style={{ fill: color }} />;
};

export default CarComponent;
