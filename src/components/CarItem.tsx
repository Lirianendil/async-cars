import React, { useState, useEffect } from "react";
import CarComponent from "./CarComponent";
import { CarStatusType, Car as CarType } from "./types";
import {deleteCar,  startAndDrive, stopEngine} from "../api/api";


interface CarItemProps {
    car: CarType;
    carStatus: CarStatusType;
    onSelect: (car: CarType) => void;
    onRemove?: (id: number) => void;
    fetchCars: () => void
}

const CarItem: React.FC<CarItemProps> = ({ car, fetchCars, carStatus, onSelect , onRemove }) => {
    const [engineStatus, setEngineStatus] = useState<
        "stopped" | "started" | "driving"
    >("stopped");

    const [carStatusState, setCarStatusState] = useState<CarStatusType | null>(carStatus)

    useEffect(() => {
        if (car) {
            setEngineStatus("stopped");
        }
    }, [car]);

    useEffect(() => {
        setCarStatusState(carStatus)
    }, [carStatus]);


    const handleEngineAction = async (
        action: "start" | "stop" | "drive" | "started"
    ) => {
        try {
            if (!car) {
                console.error("Car information is not available");
                return;
            }

            if (action === "started") {
                const status = await startAndDrive(car.id);
                setEngineStatus("driving");
                setCarStatusState(status)
            } else {
                await stopEngine(car.id);
                setEngineStatus("stopped");
                setCarStatusState(null);
            }
        } catch (error) {
            console.error(`Failed to ${action} the engine: `, error);
            setEngineStatus("stopped");
        }
    };

    const handleDelete = async () => {
        try {
           await deleteCar(car.id)
           await fetchCars()
        } catch (error) {
            console.error("Failed to delete the car:", error);
        }
    };

    return (
        <div>
            <div className="car-track">
                <div className="car-track-name">{car.name}</div>
                <div
                    className={`car ${carStatusState?.success ? "car-right" : "car-left"}`}
                    style={{
                        transition: `margin-left ${
                            carStatusState?.time ? carStatusState?.time + "ms" : "0s"
                        } linear`,
                    }}
                >
                        <CarComponent color={car.color}/>
                </div>
            </div>
            <div>
                <button onClick={() => handleEngineAction("started")} disabled={engineStatus !== "stopped"}>
                    Start
                </button>
                <button className="stop-btn" onClick={() => handleEngineAction("stop")} disabled={engineStatus === "stopped"}>
                    Stop
                </button>
                <button className="sec-btn" onClick={() => onSelect(car)}>Select</button>
                <button className="rem-btn" onClick={handleDelete}>Remove</button>
            </div>
        </div>
    );
};

export default CarItem;