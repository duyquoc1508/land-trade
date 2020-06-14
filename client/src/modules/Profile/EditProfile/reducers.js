import { LOGIN_SUCCESS, UPDATE_USER } from "./constants";

const initialState = {
  data: JSON.parse(localStorage.getItem("user")) || {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, data: action.payload.user };
    case UPDATE_USER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
