import React, { useState } from 'react';

const CarForm = () => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#000000');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name car"
            />
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <button type="submit">Create</button>
        </form>
    );
};

export default CarForm;