import { INIT_TRANSACTION_REQUEST } from "./constants";

export function initTransactionRequest({ history, data }) {
  return { type: INIT_TRANSACTION_REQUEST, payload: { history, data } };
}
