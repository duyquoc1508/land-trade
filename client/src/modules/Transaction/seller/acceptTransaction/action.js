import { ACCEPT_TRANSACTION_REQUEST } from "./constants";

export function acceptTransactionRequest(idTransaction) {
  return { type: ACCEPT_TRANSACTION_REQUEST, payload: idTransaction };
}
