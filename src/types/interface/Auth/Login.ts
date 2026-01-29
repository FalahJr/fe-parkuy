import { RegisterResponse } from "./Register";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginData extends RegisterResponse {
    access_token: string;
    refresh_token: string;
}

export interface LoginResponse{
    data : LoginData
}

export interface RefreshToken {
    id_refresh: string;
    isRevoked: boolean;
    expired_at: Date;
}

export interface Admin {
    id_admin: string;
}

export interface ProfileResponse {
    id: string;
    username: string;
    email?: any;
    role: string;
    emailVerified: boolean;
    create_at: Date;
    update_at: Date;
    refreshTokens: RefreshToken[];
    admin: Admin;
    petugas?: any;
    pengendara?: any;
}
// export type LoginResponse = RegisterResponse