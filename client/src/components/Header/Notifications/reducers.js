import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_MY_LISTING_FAILURE,
} from "./constants";

const initialState = {
  loading: false,
  notifications: [],
  error: "",
};

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };
    case FETCH_MY_LISTING_FAILURE:
      return {
        ...state,
        loading: false,
        notifications: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
