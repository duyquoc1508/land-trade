import {
  ACTIVATE_CERTIFICATE_REQUEST,
  ACTIVATE_CERTIFICATE_SUCCESS,
  ACTIVATE_CERTIFICATE_FAILURE,
} from "./constants";

const initialState = {
  loading: false,
  error: "",
};

export default function propertyPendingReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIVATE_CERTIFICATE_REQUEST:
      return { ...state, loading: true };
    case ACTIVATE_CERTIFICATE_SUCCESS:
      return { ...state, loading: false };
    case ACTIVATE_CERTIFICATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
