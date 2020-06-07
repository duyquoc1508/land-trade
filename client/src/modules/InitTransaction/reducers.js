import {
  INIT_TRANSACTION_REQUEST,
  INIT_TRANSACTION_SUCCESS,
  INIT_TRANSACTION_FAILURE,
} from "./constants";

const initialState = {
  loading: false,
  error: "",
  data: null,
};

export default function initTransactionReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_TRANSACTION_REQUEST:
      return {
        loading: true,
      };
    case INIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case INIT_TRANSACTION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
}
