import React, { useEffect, useState } from "react";
import { getWinners } from "../api/api";
import { WinnerType } from "../components/types";

const Winners = () => {
    const [winners, setWinners] = useState<WinnerType[]>([]);

    useEffect(() => {
        const fetchWinners = async () => {
            const winnersRes = await getWinners(1, 10);
            setWinners(winnersRes);
        };

        fetchWinners();
    }, []);
    return (
        <div>
            {winners?.map((winner) => (
                <div key={winner.id}>
                    {winner.id}, {winner.time}
                </div>
            ))}
        </div>
    );
};

export default Winners;