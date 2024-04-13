export interface Car {
    id: number,
    velocity?: any,
    distance?: any ,
    name: string,
    color: string,
    isMoving?: boolean,
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