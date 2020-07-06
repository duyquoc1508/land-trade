import { takeEvery, call, put } from "redux-saga/effects";

import {
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_FAILURE,
} from "./action";
import Cookie from "../../helper/cookie";

const fetchTransaction = async (txHash) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL_API}/transaction/${txHash}`,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return response.data.data;
};

const fetchPropertyTrading = async (idProperty) => {
  const response = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BASE_URL_API}/certification/id-in-blockchain/${idProperty}`,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return response.data.data;
};

// function* fetchTransactionFlow(action) {
//   try {
//     const transaction = yield call(fetchTransaction(action.payload))
//     yield put({})
//   } catch (error) {
//     yield put({
//       type: FETCH_TRANSACTION_FAILURE,
//       payload: error.message,
//     });
//   }
// }

// function* transactionWatcher() {
//   takeEvery(FETCH_TRANSACTION_REQUEST, fetchTransactionFlow);
// }
