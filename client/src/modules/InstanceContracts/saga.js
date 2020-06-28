import { takeEvery, call, put } from "redux-saga/effects";
import {
  REFRESH_PAGE,
  INIT_CONTRACT_SUCCESS,
  INIT_CONTRACT_FAILURE,
} from "./constants";
import getWeb3 from "../../helper/getWeb3";
import RealEstateContract from "../../contracts/RealEstate.json";
import TransactionContract from "../../contracts/Transaction.json";
import {
  realEstateContractAddress,
  transactionContractAddress,
} from "../../../config/common-path";

const initContract = async () => {
  const web3 = await getWeb3();
  const realEstateContract = new web3.eth.Contract(
    RealEstateContract.abi,
    realEstateContractAddress
  );
  const transactionContract = new web3.eth.Contract(
    TransactionContract.abi,
    transactionContractAddress
  );
  return { realEstateContract, transactionContract };
};

function* initContractFlow() {
  try {
    const response = yield call(initContract);
    yield put({
      type: INIT_CONTRACT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({ type: INIT_CONTRACT_FAILURE, payload: error.message });
  }
}

export default function* initContractWatcher() {
  return yield takeEvery(REFRESH_PAGE, initContractFlow);
}
