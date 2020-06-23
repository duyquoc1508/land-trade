import {
  INIT_TRANSACTION_REQUEST,
  INIT_TRANSACTION_SUCCESS,
} from "./constants";

export function initTransactionRequest({ history, data }) {
  return { type: INIT_TRANSACTION_REQUEST, payload: { history, data } };
}

export function initTransactionSuccess({ history, txHash }) {
  return { type: INIT_TRANSACTION_SUCCESS, payload: { history, txHash } };
}
