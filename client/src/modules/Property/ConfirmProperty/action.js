import {
  ACTIVATE_CERTIFICATE_REQUEST,
  ACTIVATE_CERTIFICATE_SUCCESS,
} from "./constants";

export function activateCertificateRequest(idCertificate) {
  return { type: ACTIVATE_CERTIFICATE_REQUEST, payload: idCertificate };
}

export function activateCertificateSuccess(data) {
  return { type: ACTIVATE_CERTIFICATE_SUCCESS, payload: data };
}
