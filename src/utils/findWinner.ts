import {Car, CarStatusType} from "../components/types";

export const findWinner = (responses: CarStatusType[], cars: Car[]) => {
    const winner = responses.reduce((prev, curr) =>
        prev.time !== undefined &&
        curr.time !== undefined &&
        (curr.time < prev.time || prev.time === undefined)
            ? curr
            : prev
    );

    const winnerData: Car | undefined = cars.find(car => car.id === winner.id)

    return {...winner, name: winnerData?.name, color: winnerData?.color};
};