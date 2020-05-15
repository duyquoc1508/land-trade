import { FETCH_SINGLE_PROPERTY_REQUEST } from "./constants";

export function fetchSinglePropertyRequest(txHash) {
  return { type: FETCH_SINGLE_PROPERTY_REQUEST, payload: txHash };
}
