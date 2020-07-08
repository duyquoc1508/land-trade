import { takeEvery, call, put, select } from "redux-saga/effects";
import {
  CREATE_REQUESTING,
  CREATE_ERROR,
  CREATE_CERT_WAIT_BLOCKCHAIN_CONFIRM,
} from "./constants";
import axios from "axios";
import Cookie from "../../../helper/cookie";
import { Base64 } from "js-base64";
import getWeb3 from "../../../helper/getWeb3";

function createCertificate(realEstateContract, property) {
  let { owners, properties } = property;
  const propertyBase64 = objectToB64(properties);
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
            .createCertificate(propertyBase64, owners)
            .send(
              { nonce: txCount, from: coinbase },
              (error, transactionHash) => {
                if (error) {
                  reject(error);
                } else {
                  axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_BASE_URL_API}/certification`,
                    data: { ...property, transactionHash },
                    headers: {
                      Authorization: `Bearer ${Cookie.getCookie(
                        "accessToken"
                      )}`,
                    },
                  }).then(() => resolve(transactionHash));
                }
              }
            )
            .catch((error) => {
              reject(error);
            });
        });
      });
  });
}

// convert object utf8 to base64
function objectToB64(property) {
  return Base64.encode(JSON.stringify(property));
}

// get instance of smart contract in store
const getInstanceContract = (state) => state.shared.realEstate;

function* createFlow(action) {
  try {
    const { property } = action;
    const realEstateContract = yield select(getInstanceContract);
    const response = yield call(
      createCertificate,
      realEstateContract,
      property
    );
    yield put({ type: CREATE_CERT_WAIT_BLOCKCHAIN_CONFIRM, payload: response });
  } catch (error) {
    yield put({ type: CREATE_ERROR, payload: error.message });
  }
}

function* createWatcher() {
  return yield takeEvery(CREATE_REQUESTING, createFlow);
}

export default createWatcher;
