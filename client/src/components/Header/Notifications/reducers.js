import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  READ_NOTIFICATION,
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
    case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        notifications: [],
        error: action.payload,
      };
    case READ_NOTIFICATION:
      return { ...state };
    default:
      return state;
  }
}
