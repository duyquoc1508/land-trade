import { CANCEL_SALE_REQUEST } from "./constanst";

export function cancelSaleRequest(idCertificate) {
  return { type: CANCEL_SALE_REQUEST, payload: idCertificate }
}
