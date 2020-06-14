import { UPDATE_USER } from "./constants";

export function UpdateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user,
  };
}
