import {
  FETCH_TRANSACTION_REQUEST,
  CANCEL_TRANSACTION_REQUEST,
} from "./constants";

export function fetchTransactionRequest(txHash) {
  return { type: FETCH_TRANSACTION_REQUEST, payload: txHash };
}

// get sender
export function cancelTransactionRequest(transaction, publicAddress) {
  return {
    type: CANCEL_TRANSACTION_REQUEST,
    payload: { transaction, publicAddress },
  };
}
