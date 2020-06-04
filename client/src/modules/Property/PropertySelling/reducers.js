import {
  CANCEL_SALE_REQUEST,
  CANCEL_SALE_REQUEST_SUCCESS,
  CANCEL_SALE_REQUEST_FAILURE
} from "./constanst";

const initialState = {
  loading: false,
  error: ""
}

export default function propertySellingReducer(state = initialState, action) {
  switch (action.type) {
    case CANCEL_SALE_REQUEST:
      return {
        loading: true,
      }
    case CANCEL_SALE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case CANCEL_SALE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
