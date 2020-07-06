import { INIT_SOCKET, REFRESH_PAGE } from "./constants";

export function initSocket(socket) {
  return { type: INIT_SOCKET, payload: socket };
}

export function refreshPage() {
  return { type: REFRESH_PAGE };
}

export function dispatchEventFromBlockchain(eventName, txHash) {
  return { type: eventName, payload: txHash };
}
