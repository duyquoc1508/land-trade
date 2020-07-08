import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  ACTIVATE_CERTIFICATE_REQUEST,
  ACTIVATE_CERT_WAIT_BLOCKCHAIN_CONFIRM,
  ACTIVATE_CERTIFICATE_FAILURE,
} from "./constants";
import getWeb3 from "../../../helper/getWeb3";

function activateCertificate(realEstateContract, idCertificate) {
  return new Promise((resolve, reject) => {
    let web3 = "";
    getWeb3()
      .then((result) => {
        web3 = result;
        return web3.eth.getCoinbase();
      })
      .then((coinbase) => {
        web3.eth.getTransactionCount(coinbase, (error, txCount) => {
          if (error) {
            reject(error);
          }
          realEstateContract.methods
            .activate(idCertificate)
            .send({ from: coinbase, nonce: txCount }, function (
              error,
              transactionHash
            ) {
              if (error) {
                reject(error);
              } else {
                resolve(transactionHash);
              }
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
  });
}

const getRealEstateContract = (state) => state.shared.realEstate;

function* activateFlow(action) {
  try {
    const realEstateContract = yield select(getRealEstateContract);
    const response = yield call(
      activateCertificate,
      realEstateContract,
      action.payload
    );
    yield put({
      type: ACTIVATE_CERT_WAIT_BLOCKCHAIN_CONFIRM,
      payload: response,
    });
  } catch (error) {
    yield put({ type: ACTIVATE_CERTIFICATE_FAILURE, payload: error.message });
  }
}

export default function* watchActivateCertificate() {
  yield takeEvery(ACTIVATE_CERTIFICATE_REQUEST, activateFlow);
}
