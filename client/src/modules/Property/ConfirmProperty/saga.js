import { call, put, takeEvery } from "redux-saga/effects";
import {
  ACTIVATE_CERTIFICATE_REQUEST,
  ACTIVATE_CERTIFICATE_SUCCESS,
  ACTIVATE_CERTIFICATE_FAILURE,
} from "./constants";
import Web3 from "web3";
import RealEstateContract from "../../../contracts/RealEstate.json";
import { realEstateContractAddress } from "../../../../config/common-path";

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

async function activateCertificate(idCertificate) {
  console.log(idCertificate);
  try {
    await loadWeb3();
    const { web3 } = window;
    const appContract = new web3.eth.Contract(
      RealEstateContract.abi,
      realEstateContractAddress
    );
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }
    appContract.methods
      .activate(idCertificate)
      .send({ from: coinbase }, function (error, transactionHash) {
        console.log(
          "%c%s",
          "color: green; font-weight: bold",
          `TxHash: ${transactionHash}`
        );
        // handleCreateCert(property, transactionHash);
      });
  } catch (error) {
    console.log(error);
  }
}

function* activateFlow(action) {
  try {
    const response = yield call(activateCertificate, action.payload);
    yield put({ type: ACTIVATE_CERTIFICATE_SUCCESS });
    console.log(response);
  } catch (error) {
    yield put({ type: ACTIVATE_CERTIFICATE_FAILURE, payload: error.message });
  }
}

export default function* watchActivateCertificate() {
  yield takeEvery(ACTIVATE_CERTIFICATE_REQUEST, activateFlow);
}
