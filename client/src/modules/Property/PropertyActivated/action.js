import { ACTIVATE_SALE_REQUEST } from "./constants";

export function activateSaleRequest(idCertificate) {
  return {
    type: ACTIVATE_SALE_REQUEST,
    payload: idCertificate
  }
}
