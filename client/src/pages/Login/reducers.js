import { LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import Cookie from "../../helper/cookie";

const initialState = {
  // id: null,
  accessToken: Cookie.getCookie("accessToken")
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        // id: "action.id",
        accessToken: action.accessToken
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

export default loginReducer;
