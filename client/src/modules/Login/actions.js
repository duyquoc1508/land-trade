// login
import { LOGIN_REQUESTING } from "./constants";

export function requestLogin() {
  return { type: LOGIN_REQUESTING };
}
