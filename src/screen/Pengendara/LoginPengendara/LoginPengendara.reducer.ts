import { LoginPengendaraRequest } from "../../../types";

export interface State {
  isSubmitted: boolean;
  sending: boolean;
  inputs: LoginPengendaraRequest;
}

export const initialState: State = {
  isSubmitted: false,
  sending: false,
  inputs: {
    email: "",
    password: "",
  },
};

type Action =
  | { type: "SET_IS_SUBMITTED"; payload: boolean }
  | { type: "SET_SENDING"; payload: boolean }
  | { type: "SET_INPUTS"; payload: LoginPengendaraRequest };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_IS_SUBMITTED":
      return { ...state, isSubmitted: action.payload };
    case "SET_SENDING":
      return { ...state, sending: action.payload };
    case "SET_INPUTS":
      return { ...state, inputs: action.payload };
    default:
      return state;
  }
};
