import { LOGIN_SUCCESS, LOGIN_ERROR, CONNECT_SOCKET } from "./constants";
import Cookie from "../../helper/cookie";

const initialState = {
  accessToken: Cookie.getCookie("accessToken"),
  user: JSON.parse(localStorage.getItem("user")) || {},
  socket: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        // id: "action.id",
        ...state,
        accessToken: action.payload.accessToken,
      };
    case LOGIN_ERROR:
      return {
        // id: null,
        ...state,
        accessToken: null,
      };
    case CONNECT_SOCKET:
      return {
        ...state,
        socket: action.payload.socket,
      };
    default:
      return state;
  }
}
