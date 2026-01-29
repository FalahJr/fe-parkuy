import { AxiosResponse } from "axios"
import { ConfirmApplicationResponse, dateInterviewRequest, DetailDataPetugas, getAllPetugas, getDetailPetugas, petugasRequest } from "../types"
import api from "./api.service"

// Get All Data Berkas
export const petugas = async (): Promise<AxiosResponse<getAllPetugas[]>> => {
  return await api.get('petugas/petugas-belum-diterima')
} 

// Get Detail Berkas
export const detailPetugas = async (id:string): Promise<AxiosResponse<DetailDataPetugas>> => {
  return await api.get('petugas/berkas-petugas/'+id)
} 

// ACC Berkas
export const confirmApplication = async (id:string): Promise<AxiosResponse<ConfirmApplicationResponse>> => {
  return await api.put('users/accept-petugas/'+id)
} 

// Set Date Interview
export const dateInterview = async (id:string, data:dateInterviewRequest): Promise<AxiosResponse<"sukses">> => {
  return await api.put('users/setup-berkas-petugas/'+id, data)
} 

// Reject Berkas
// export const rejectApplication = async (id:string): Promise<AxiosResponse<"sukses">> => {
//   return await api.delete('users/delete/'+id)
// } 

// Reject Application
export const rejectApplication = async (id:string): Promise<AxiosResponse<"Sukses">> => {
  return await api.put('users/refuse-officer/'+id)
} 
// export const detailPetugas = async (data: petugasRequest): Promise<AxiosResponse<getDetailPetugas>> => {
//   return await api.post('petugas/berkas-petugas-byid', data)
// }