import { PAYMENT_REQUEST } from "./constants";

export function paymentRequest(transaction) {
  return { type: PAYMENT_REQUEST, payload: transaction };
}
