import { AxiosResponse } from "axios"
import { CreateLocationRequest, CreateLocationResponse, DetailLocationResponse, EditStatusLocationRequest, getLocationResponse } from "../types/interface/Location/getLocation"
import api from "./api.service"

// API GET DATA
export const location = async (): Promise<AxiosResponse<getLocationResponse[]>> => {
  return await api.get('location/get-location')
} 

// API CREATE DATA
export const create = async (data: CreateLocationRequest): Promise<AxiosResponse<CreateLocationResponse>> => {
  return await api.post('location/create-location', data)
}

// API EDIT DATA
export const editLocation = async (id:string, dataEdit: CreateLocationRequest): Promise<AxiosResponse<"Sukses">> => {
  return await api.put('location/update-location/'+id, dataEdit)
}

// API EDIT STATUS LOCATION
export const editStatusLocation = async (id:string, dataEdit: EditStatusLocationRequest): Promise<AxiosResponse<"Sukses">> => {
  return await api.put('location/update-status-location/'+id, dataEdit)
}

//API GET DETAIL DATA BY ID
export const detailLocation = async (id:string): Promise<AxiosResponse<DetailLocationResponse>> => {
  return await api.get('location/get-location/'+id)
} 

// DELETE BY ID
export const deleteLocation = async (id:string): Promise<AxiosResponse<"Sukses">> => {
  return await api.delete('location/delete-location/'+id)
} 

// export const editLocation = async (data: CreateLocationRequest): Promise<AxiosResponse<CreateLocationResponse>> => {
//   return await api.post('location/create-location', data)
// }

// export const detailPetugas = async (data: petugasRequest): Promise<AxiosResponse<getDetailPetugas>> => {
//   return await api.post('petugas/berkas-petugas-byid', data)
// }