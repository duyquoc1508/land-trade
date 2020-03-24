import { FETCH_MY_LISTING_SUCCESS } from "./constants";

const initialState = [];

function fetchListingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MY_LISTING_SUCCESS:
      return [...action.payload];
    default:
      return state;
  }
}

export default fetchListingReducer;
