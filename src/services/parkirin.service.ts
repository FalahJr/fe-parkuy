import { AxiosResponse } from "axios"
import { DetailParkirInReponse, ParkirInResponse } from "../types"
import api from "./api.service"

export const getParkirIn = async (): Promise<AxiosResponse<ParkirInResponse[]>> => {
  return await api.get('parking/parking-entrance')
} 

export const detailParkirIn = async (id:string): Promise<AxiosResponse<DetailParkirInReponse>> => {
  return await api.get('parking/parking-entrance/'+id)
} 