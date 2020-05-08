import {
  FETCH_MY_LISTING_REQUEST,
  FETCH_MY_LISTING_SUCCESS,
  FETCH_MY_LISTING_ERROR,
} from "./constants";

const initialState = {
  loading: false,
  properties: [],
  error: "",
};

function fetchListingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MY_LISTING_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_MY_LISTING_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.payload,
      };
    case FETCH_MY_LISTING_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}

export default fetchListingReducer;
