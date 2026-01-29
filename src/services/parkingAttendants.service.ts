import { AxiosResponse } from "axios"
import { DetailPetugasDiterimaResponse, PetugasDiterimaResponse, SetLokasiRequest, SetLokasiResponse } from "../types"
import { CreateLocationResponse } from "../types/interface/Location/getLocation"
import api from "./api.service"

// export const petugasDiterima = async (): Promise<AxiosResponse<PetugasDiterimaResponse[]>> => {
//   return await api.get('petugas/petugas-diterima')
// } 

export const petugasDiterima = async (): Promise<AxiosResponse<PetugasDiterimaResponse[]>> => {
  return await api.get('petugas/petugas-diterima')
} 

export const detailPetugasDiterima = async (id:string): Promise<AxiosResponse<DetailPetugasDiterimaResponse>> => {
  return await api.get('petugas/accepted-by-location/'+id)
} 

export const setLokasi = async (id:string, dataLokasi: SetLokasiRequest):Promise<AxiosResponse<SetLokasiResponse>> => {
  return await api.put('petugas/update-location-petugas/'+id, dataLokasi)
} 