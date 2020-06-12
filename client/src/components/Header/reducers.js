import { INIT_SOCKET } from "./constants";

const initialState = {
  socket: null,
};

export default function headerReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
}
