import { AxiosResponse } from "axios";
import api from "./api.service";
import {
  LoginPengendaraRequest,
  LoginPengendaraResponse,
  RegisterPengendaraRequest,
  RegisterPengendaraResponse,
  PengendaraProfileRequest,
  UpdatePengendaraResponse,
  PengendaraDetailData,
} from "../types/interface/Pengendara/Auth";

// Login Pengendara
export const loginPengendara = async (
  data: LoginPengendaraRequest,
): Promise<AxiosResponse<LoginPengendaraResponse>> => {
  return await api.post("/auth/login-pengendara", data);
};

// Register Pengendara
export const registerPengendara = async (
  data: RegisterPengendaraRequest,
): Promise<AxiosResponse<RegisterPengendaraResponse>> => {
  return await api.post("/auth/register-pengendara", data);
};

// Get Detail Pengendara by ID
export const getDetailPengendara = async (
  id: string,
): Promise<AxiosResponse<PengendaraDetailData>> => {
  return await api.get(`/pengendara/detail-pengendara/${id}`);
};

// Update Pengendara Profile
export const updatePengendaraProfile = async (
  id: string,
  data: PengendaraProfileRequest,
): Promise<AxiosResponse<UpdatePengendaraResponse>> => {
  return await api.put(`/pengendara/update-pengendara/${id}`, data);
};
