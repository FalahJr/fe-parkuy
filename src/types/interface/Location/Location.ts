export interface LocationData {
  id_location: number;
  locationName: string;
  cityName: string;
  car: number;
  motorCycle: number;
  availableCars: number;
  availableMotorCycles: number;
  address: string;
  coordinate: string;
  rate: number;
  status: string;
  create_at: string;
  update_at: string;
}

export interface GetAllLocationResponse {
  statusCode: number;
  message: string;
  data: LocationData[];
}

export interface GetLocationByIdResponse {
  statusCode: number;
  message: string;
  data: LocationData;
}
