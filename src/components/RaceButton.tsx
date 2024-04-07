import React, { useState } from 'react';
import { Car } from "./types";

interface RaceButtonProps {
    onStartRace: () => void;
    cars: Car[];
}

export const RaceButton: React.FC<RaceButtonProps> = ({ onStartRace, cars }) => {
    return <button onClick={onStartRace}>Start Race</button>;
};

interface ResetButtonProps {
    onReset: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
    const [resetInProgress, setResetInProgress] = useState(false); // Состояние для отслеживания процесса сброса

    const handleResetClick = async () => {
        try {
            const response = await fetch('URL_для_сброса_позиций', {
                method: 'POST',
            });

            if (response.ok) {
                setResetInProgress(true);
            } else {
                console.error('Failed to reset cars:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to reset cars:', error);
        }
    };

    return (
        <button type="button" onClick={handleResetClick} disabled={resetInProgress}>
            Reset
        </button>
    );
};