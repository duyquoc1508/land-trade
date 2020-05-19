import { ACTIVATE_CERTIFICATE_REQUEST } from "./constants";

export function activateCertificateRequest(idCertificate) {
  return { type: ACTIVATE_CERTIFICATE_REQUEST, payload: idCertificate };
}
