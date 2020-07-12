import { INIT_SOCKET, REFRESH_PAGE, NEW_NOTIFICATION } from "./constants";

export function initSocket(socket) {
  return { type: INIT_SOCKET, payload: socket };
}

export function refreshPage() {
  return { type: REFRESH_PAGE };
}

export function dispatchEventFromBlockchain(eventName, txHash) {
  return { type: eventName, payload: txHash };
}

export function newNotification() {
  return { type: NEW_NOTIFICATION };
}
