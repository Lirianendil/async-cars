import React, { useState } from 'react';

interface ResetButtonProps {
    onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
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

export { ResetButton };
