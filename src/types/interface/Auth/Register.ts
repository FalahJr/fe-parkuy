import { Data } from "../User/Data";

export interface RegisterRequest {
    username: string;
    password: string;
}

export interface RegisterResponse {
    statusCode: number;
    message: string;
    data: Data;
}