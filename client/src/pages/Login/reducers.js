import { LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";

const initialState = {
  // id: null,
  accessToken: null
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
