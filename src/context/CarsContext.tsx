import React, {createContext, ReactNode, useState} from "react";

interface  Car {
    id: number;
    name: string;
    color: string;
}

interface ContextProps {
    cars: Car[];
    setCars: (cars: Car[]) => void;
}

export const CarsContext = createContext<ContextProps | null>(null);

interface CarsProviderProps {
    children: ReactNode;
}

export const CarsProvider: React.FC = ({ children }) => {
    const [cars, setCars] = useState<Car[]>([]);

    return (
        <CarsContext.Provider value={{ cars, setCars }}>
            {children}
        </CarsContext.Provider>
    );
};