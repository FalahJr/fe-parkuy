export type LocationSearchAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_LOCATIONS"; payload: any[] }
  | { type: "SET_SELECTED_LOCATION"; payload: any | null }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_ERROR"; payload: string };

export interface LocationSearchState {
  loading: boolean;
  locations: any[];
  selectedLocation: any | null;
  searchQuery: string;
  error: string;
}

export const initialState: LocationSearchState = {
  loading: false,
  locations: [],
  selectedLocation: null,
  searchQuery: "",
  error: "",
};

export const locationSearchReducer = (
  state: LocationSearchState,
  action: LocationSearchAction,
): LocationSearchState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_LOCATIONS":
      return { ...state, locations: action.payload, loading: false };
    case "SET_SELECTED_LOCATION":
      return { ...state, selectedLocation: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
