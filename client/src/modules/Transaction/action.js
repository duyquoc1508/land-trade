import {
  FETCH_TRANSACTION_REQUEST,
  CANCEL_TRANSACTION_REQUEST,
  ACCEPT_TRANSACTION_SUCCESS,
  PAYMENT_REQUEST_SUCCESS,
  CONFIRM_TRANSACTION_SUCCESS,
  CANCEL_TRANSACTION_SUCCESS,
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

export function acceptTransactionSuccess(data) {
  return { type: ACCEPT_TRANSACTION_SUCCESS, payload: data };
}

export function paymentTransactionSuccess(data) {
  return { type: PAYMENT_REQUEST_SUCCESS, payload: data };
}

export function confirmTransactionSuccess(data) {
  return { type: CONFIRM_TRANSACTION_SUCCESS, payload: data };
}

export function cancelTransactionSuccess(data) {
  return { type: CANCEL_TRANSACTION_SUCCESS, payload: data };
}
