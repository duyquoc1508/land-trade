import {
  INIT_TRANSACTION_REQUEST,
  INIT_TRANSACTION_SUCCESS,
  INIT_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
} from "./constants";

export function initTransactionRequest({ history, data }) {
  return { type: INIT_TRANSACTION_REQUEST, payload: { history, data } };
}

export function initTransactionSuccess(data) {
  return { type: INIT_TRANSACTION_SUCCESS, payload: data };
}

export function waitBlockchainConfirm(txHash) {
  return { type: INIT_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM, payload: txHash };
}
