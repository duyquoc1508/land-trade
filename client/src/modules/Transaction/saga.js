import { takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_FAILURE,
  FETCH_TRADING_PROPERTY_SUCCESS,
} from "./constants";
import Cookie from "../../helper/cookie";

const fetchTransaction = async (idTransaction) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL_API}/transaction/${idTransaction}`,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return response.data.data;
};

const fetchPropertyTrading = async (idProperty) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL_API}/certification/${idProperty}`,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return response.data.data;
};

function* fetchTransactionFlow(action) {
  try {
    const transaction = yield call(fetchTransaction, action.payload);
    yield put({ type: FETCH_TRANSACTION_SUCCESS, payload: transaction });
    const property = yield call(fetchPropertyTrading, transaction.idProperty);
    yield put({ type: FETCH_TRADING_PROPERTY_SUCCESS, payload: property });
  } catch (error) {
    yield put({ type: FETCH_TRANSACTION_FAILURE, payload: error.message });
  }
}

function* fetchTransactionWatcher() {
  yield takeEvery(FETCH_TRANSACTION_REQUEST, fetchTransactionFlow);
}

export default fetchTransactionWatcher;
