import { INIT_TRANSACTION_REQUEST } from "./constants";

export function initTransactionRequest(data) {
  return { type: INIT_TRANSACTION_REQUEST, payload: data };
}
