import { FETCH_MY_LISTING_REQUESTING } from "./constants";

export function requestFetch() {
  return {
    type: FETCH_MY_LISTING_REQUESTING
  };
}
