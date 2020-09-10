import {
  FETCH_LISTINGS_SALE_SUCCESS,
  FETCH_LISTINGS_SALE_ERROR,
} from "./constants";

const initialState = [];

function fetchListingSaleReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LISTINGS_SALE_SUCCESS:
      return [...action.payload];
    case FETCH_LISTINGS_SALE_ERROR:
      return [];
    default:
      return state;
  }
}

export default fetchListingSaleReducer;
