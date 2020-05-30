import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN_SUCCESS, INIT_CONTRACT_SUCCESS } from "./constants";
import getWeb3 from "../../helper/getWeb3";
import RealEstateContract from "../../contracts/RealEstate.json";
import { realEstateContractAddress } from "../../../config/common-path";

const initRealEstateContract = async () => {
  const web3 = await getWeb3();
  const instance = new web3.eth.Contract(RealEstateContract.abi, realEstateContractAddress);
  return instance;
}

function* initContract() {
  const realEstate = yield call(initRealEstateContract);
  yield put({ type: INIT_CONTRACT_SUCCESS, payload: { realEstate } });
}


export default function* initContractWatcher() {
  return yield takeEvery(LOGIN_SUCCESS, initContract);
}



