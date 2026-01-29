import { AxiosResponse } from "axios"
import { LoginRequest, LoginResponse, Profile, ProfileResponse, RegisterRequest, RegisterResponse } from "../types"
import api from "./api.service"

export const register = async (data: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> => {
    return await api.post('users/register-admin', data) 
}

export const login = async (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
    return await api.post('auth/login-admin', data)
}

export const profile = async (id:string): Promise<AxiosResponse<ProfileResponse>> => {
    return await api.get('users/'+id)
} 