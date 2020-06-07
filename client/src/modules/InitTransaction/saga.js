import { takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import Cookie from "../../helper/cookie";
import { browserHistory } from "react-router";

import {
  INIT_TRANSACTION_REQUEST,
  INIT_TRANSACTION_SUCCESS,
  INIT_TRANSACTION_FAILURE,
} from "./constants";

const initTransaction = async (data) => {
  console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL_API}/transaction`,
    data: data,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return response.data.data;
};

function* initTransactionFlow(action) {
  try {
    const response = yield call(initTransaction, action.payload);
    yield put({ type: INIT_TRANSACTION_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: INIT_TRANSACTION_FAILURE, payload: error.message });
  }
}

export default function* initTransactionWatcher() {
  yield takeEvery(INIT_TRANSACTION_REQUEST, initTransactionFlow);
}
