import { UserPengendara } from "../ParkirInOut/getParkirInOut";

// Login Pengendara
export interface LoginPengendaraRequest {
  email: string;
  password: string;
}

export interface LoginPengendaraData {
  id_pengendara: string;
  access_token: string;
  refresh_token: string;
  emailVerified: boolean;
  status: boolean;
  status_parkir: string;
}

export interface LoginPengendaraResponse {
  statusCode: number;
  message: string;
  data: LoginPengendaraData;
}

// Register Pengendara
export interface RegisterPengendaraRequest {
  email: string;
  password: string;
}

export interface RegisterPengendaraResponse {
  statusCode: number;
  message: string;
}

// Pengendara Profile
export interface PengendaraProfileRequest {
  fullName: string;
  phone: string;
  cityName: string;
  address: string;
  nopol: string;
  jenis_kendaraan: string;
}

// Note: UserPengendara sudah di-export dari ParkirInOut/getParkirInOut.ts
// Import dari sana untuk menghindari duplikasi

export interface PengendaraDetailData {
  id_pengendara: string;
  fullName: string;
  phone: string;
  cityName: string;
  address: string;
  nopol: string;
  jenis_kendaraan: string;
  status: boolean;
  status_parkir: string;
  user: UserPengendara;
  create_at: Date;
  update_at: Date;
}

export interface PengendaraDetailResponse {
  data: PengendaraDetailData;
  statusCode?: number;
  message?: string;
}

export interface UpdatePengendaraResponse {
  statusCode: number;
  message: string;
}
