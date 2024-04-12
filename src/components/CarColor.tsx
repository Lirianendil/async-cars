import React from 'react';
import CarComponent from '../components/CarComponent';

const SomeOtherComponent = () => {
    const carColor = '#ff0000';

    return (
        <div>
            <CarComponent color={carColor} />
        </div>
    );
};

export default SomeOtherComponent;
