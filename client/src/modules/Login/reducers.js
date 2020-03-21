import { LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import Cookie from "../../helper/cookie";

const initialState = {
  accessToken: Cookie.getCookie("accessToken"),
  user: {}
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        // id: "action.id",
        accessToken: action.payload.accessToken
      };
    case LOGIN_ERROR:
      return {
        // id: null,
        accessToken: null
      };
    default:
      return state;
  }
}
