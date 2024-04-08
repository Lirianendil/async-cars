export interface Car {
    id: number,
    velocity: number,
    distance: number ,
    name: string,
    color: string,
}


export interface Winner {
    id: number;
    wins: number;
    time: number;
}

export interface EngineResponse {
    velocity: number;
    distance: 500000;
}

export interface DriveStatus {
    success: boolean;
}
export interface StopEngineResponse {
    success: boolean;
    message?: string;
}