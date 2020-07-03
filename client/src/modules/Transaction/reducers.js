import {
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_FAILURE,
  FETCH_TRADING_PROPERTY_SUCCESS,
} from "./constants";

const initialState = {
  data: "",
  property: "",
  loading: false,
  error: "",
};

export default function transactionReducers(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TRADING_PROPERTY_SUCCESS:
      return {
        ...state,
        property: action.payload,
      };
    default:
      return state;
  }
}
