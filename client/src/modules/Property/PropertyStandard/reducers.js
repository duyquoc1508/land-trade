import {
  FETCH_SINGLE_PROPERTY_REQUEST,
  FETCH_SINGLE_PROPERTY_SUCCESS,
  FETCH_SINGLE_PROPERTY_FAILURE,
} from "./constants";

const initialState = {
  data: null,
  loading: false,
  error: "",
};

export default function PropertyStandardReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SINGLE_PROPERTY_REQUEST:
      return { ...state, loading: true };
    case FETCH_SINGLE_PROPERTY_SUCCESS:
      return { data: action.payload, loading: false, error: "" };
    case FETCH_SINGLE_PROPERTY_FAILURE:
      return { data: null, loading: false, error: action.payload };
    default:
      return state;
  }
}
