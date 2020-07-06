import {
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_FAILURE,
} from "./constants";

const initialState = {
  transaction: "",
  loading: false,
  error: "",
};

export function TransactionReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: action.payload,
      };
    case FETCH_TRANSACTION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
