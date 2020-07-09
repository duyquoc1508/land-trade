import { FETCH_NOTIFICATIONS_REQUEST, READ_NOTIFICATION } from "./constants";

export function fetchNotificationsRequest() {
  return {
    type: FETCH_NOTIFICATIONS_REQUEST,
  };
}

export function readNotification() {
  return { type: READ_NOTIFICATION };
}
