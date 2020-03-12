import { LOGIN_SUCCESS, UPDATE_USER } from "./constants";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.user;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
