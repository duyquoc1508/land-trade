import { CONFIRM_TRANSACTION_REQUEST } from "./constants";

export function confirmTransactionRequest(transaction) {
  return { type: CONFIRM_TRANSACTION_REQUEST, payload: transaction };
}
