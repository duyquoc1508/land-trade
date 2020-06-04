import {
  ACTIVATE_SALE_REQUEST,
  ACTIVATE_SALE_SUCCESS,
  ACTIVATE_SALE_FAILURE
} from './constants';

const initialState = {
  loading: false,
  error: ""
}

export default function propertyActivatedReducers(state = initialState, action) {
  switch (action.type) {
    case ACTIVATE_SALE_REQUEST:
      return {
        loading: true
      }
    case ACTIVATE_SALE_SUCCESS:
      return {
        ...state, loading: false
      }
    case ACTIVATE_SALE_FAILURE:
      return {
        ...state, loading: false, error: action.payload
      }
    default:
      return state
  }
}
