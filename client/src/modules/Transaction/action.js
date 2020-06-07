import { FETCH_TRANSACTION_REQUEST } from "./constants";

export function fetchTransactionRequest(idTransaction) {
  return { type: FETCH_TRANSACTION_REQUEST, payload: idTransaction };
}
