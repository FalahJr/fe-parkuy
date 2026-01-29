export interface getLocationResponse {
    id_location: string;
    locationName: string;
    cityName: string;
    car: number;
    motorCycle: number;
    address: string;
    coordinate: string;
    rate: number;
    status: number;
    id_admin: string;
}

export interface CreateLocationRequest {
    locationName: string;
    cityName: string;
    motorCycle: number;
    car: number;
    availableCars: number;
    availableMotorCycles: number;
    address: string;
    coordinate: string;
    rate: number;
}

export interface EditLocationRequest {
    locationName: string;
    cityName: string;
    car: number;
    motorCycle: number;
    availableCars: number;
    availableMotorCycles: number;
    address: string;
    coordinate: string;
    rate: number;
}

export interface Data {
    id_admin: string;
}

export interface CreateLocationResponse {
    status: number;
    message: string;
    data: Data;
}

export interface DetailLocationResponse {
    id_location: string;
    locationName: string;
    cityName: string;
    car: number;
    motorCycle: number;
    address: string;
    coordinate: string;
    rate: number;
    status: boolean;
    create_at: Date;
    update_at: Date;
}

export interface EditStatusLocationRequest {
    status:boolean;
}