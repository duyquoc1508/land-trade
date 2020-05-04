import { FETCH_NOTIFICATIONS_REQUEST } from "./constants";

export function fetchNotificationsRequest() {
  return {
    type: FETCH_NOTIFICATIONS_REQUEST,
  };
}
