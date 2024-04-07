import React from 'react';

interface RaceButtonProps {
    onStartRace: () => void;
}

export const RaceButton: React.FC<RaceButtonProps> = ({ onStartRace }) => {
    return <button onClick={onStartRace}>Start Race</button>;
};

interface ResetButtonProps {
    onReset: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
    return <button onClick={onReset}>Reset Race</button>;
};
