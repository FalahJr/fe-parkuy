import { PengendaraProfileRequest } from "../../../types";

export interface State {
  isSubmitted: boolean;
  sending: boolean;
  loading: boolean;
  inputs: PengendaraProfileRequest;
}

export const initialState: State = {
  isSubmitted: false,
  sending: false,
  loading: true,
  inputs: {
    fullName: "",
    phone: "",
    cityName: "",
    address: "",
    nopol: "",
    jenis_kendaraan: "",
  },
};

type Action =
  | { type: "SET_IS_SUBMITTED"; payload: boolean }
  | { type: "SET_SENDING"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_INPUTS"; payload: PengendaraProfileRequest };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_IS_SUBMITTED":
      return { ...state, isSubmitted: action.payload };
    case "SET_SENDING":
      return { ...state, sending: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_INPUTS":
      return { ...state, inputs: action.payload };
    default:
      return state;
  }
};
