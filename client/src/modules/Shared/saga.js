import { takeEvery, call, put, all } from "redux-saga/effects";
import {
  REFRESH_PAGE,
  INIT_CONTRACT_SUCCESS,
  INIT_CONTRACT_FAILURE,
  GET_COINBASE_BALANCE_SUCCESS,
  GET_ETH_PRICE_SUCCESS,
  GET_ETH_PRICE_FAILURE,
} from "./constants";
import getWeb3 from "../../helper/getWeb3";
import RealEstateContract from "../../contracts/RealEstate.json";
import TransactionContract from "../../contracts/Transaction.json";
import {
  realEstateContractAddress,
  transactionContractAddress,
} from "../../../config/common-path";
import axios from "axios";

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
  return { web3, realEstateContract, transactionContract };
};

const getEthPrice = async () => {
  // fetch eth price
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL_API}/exchange_rate`
  );
  if (response.data.statusCode === 200) {
    return response.data.data.ETH.quote.VND.price;
  }
};

function* getEthPriceFlow() {
  try {
    const response = yield call(getEthPrice);
    yield put({ type: GET_ETH_PRICE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: GET_ETH_PRICE_FAILURE, payload: error.message });
  }
}

const getBalanceOfCoinbase = async (web3) => {
  const coinbase = await web3.eth.getCoinbase();
  const balance = await web3.eth.getBalance(coinbase);
  return web3.utils.fromWei(balance, "ether");
};

function* initContractFlow() {
  try {
    const response = yield call(initContract);
    yield put({
      type: INIT_CONTRACT_SUCCESS,
      payload: response,
    });
    const { web3 } = response;
    const balance = yield call(getBalanceOfCoinbase, web3);
    yield put({ type: GET_COINBASE_BALANCE_SUCCESS, payload: balance });
  } catch (error) {
    yield put({ type: INIT_CONTRACT_FAILURE, payload: error.message });
  }
}

export default function* initContractWatcher() {
  yield all([
    takeEvery(REFRESH_PAGE, getEthPriceFlow),
    takeEvery(REFRESH_PAGE, initContractFlow),
  ]);
}
