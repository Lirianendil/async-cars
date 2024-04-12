    import React, { useState } from 'react';
    import '../components/СarUpdate.css'



    export interface Car {
        id: number;
        velocity?: number;
        distance?: number;
        name: string;
        color: string;
    }

    interface CarFormProps {
        addNewCar: (newCar: Omit<Car, 'id'>) => Promise<void>;
    }
    const CarForm: React.FC<CarFormProps> = ({ addNewCar }) => {
        const [name, setName] = useState('');
        const [color, setColor] = useState('');
        const [error, setError] = useState('');

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const response = await fetch('http://localhost:3000/garage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, color }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const newCar = await response.json();
                addNewCar(newCar);
                setName('');
                setColor('');
            } catch (error) {
                console.error('Failed to create new car:', error);
                setError('Failed to create car');
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name of the car" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="color" name="color" value={color} onChange={(e) => setColor(e.target.value)} />
                <div className="button-container">
                    <button className="button button-create" type="submit">Create</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        );
    };

    export default CarForm;
