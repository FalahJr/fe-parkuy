import { RegisterPengendaraRequest } from "../../../types";

export interface State {
  isSubmitted: boolean;
  sending: boolean;
  inputs: RegisterPengendaraRequest & { confirmPassword: string };
}

export const initialState: State = {
  isSubmitted: false,
  sending: false,
  inputs: {
    email: "",
    password: "",
    confirmPassword: "",
  },
};

type Action =
  | { type: "SET_IS_SUBMITTED"; payload: boolean }
  | { type: "SET_SENDING"; payload: boolean }
  | {
      type: "SET_INPUTS";
      payload: RegisterPengendaraRequest & { confirmPassword: string };
    };

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
