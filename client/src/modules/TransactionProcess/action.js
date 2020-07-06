import { FETCH_TRANSACTION_REQUEST } from "./constants";

export function fetchTransactionRequest(transactionHash) {
  return { type: FETCH_TRANSACTION_REQUEST, payload: transactionHash };
}

export function cancelTransactionRequest(transactionHash, publicAddress) {}
