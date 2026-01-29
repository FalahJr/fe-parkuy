import { AxiosResponse } from "axios"
import {  DetailParkirOutResponse, ParkirOutResponse } from "../types"
import api from "./api.service"

export const getParkirOut = async (): Promise<AxiosResponse<ParkirOutResponse[]>> => {
  return await api.get('parking/parking-out')
} 

export const detailParkirOut = async (id:string): Promise<AxiosResponse<DetailParkirOutResponse>> => {
  return await api.get('parking/parking-out/'+id)
} 