import { INIT_SOCKET } from "./constants";

export function initSocket(socket) {
  return { type: INIT_SOCKET, payload: socket };
}
