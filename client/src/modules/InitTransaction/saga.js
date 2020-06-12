import { takeEvery, call, put, select } from "redux-saga/effects";
import axios from "axios";
import Cookie from "../../helper/cookie";
import { browserHistory } from "react-router";

import {
  INIT_TRANSACTION_REQUEST,
  INIT_TRANSACTION_SUCCESS,
  INIT_TRANSACTION_FAILURE,
} from "./constants";

const initTransaction = async (data) => {
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

const getSocket = (state) => state.header.socket;

const emitEventInitTransition = (socket, participants) => {
  socket.emit("new-transaction", participants);
};

const getBuyerAndSellerOfTransaction = (transaction) => {
  const buyer = transaction.buyer;
  const seller = transaction.seller;
  return { buyer, seller };
};

function* initTransactionFlow(action) {
  try {
    const socket = yield select(getSocket);
    const response = yield call(initTransaction, action.payload);
    yield put({ type: INIT_TRANSACTION_SUCCESS, payload: response });
    const { buyer, seller } = yield call(
      getBuyerAndSellerOfTransaction,
      response
    );
    yield call(emitEventInitTransition, socket, { buyer, seller });
  } catch (error) {
    yield put({ type: INIT_TRANSACTION_FAILURE, payload: error.message });
    console.log(error);
  }
}

export default function* initTransactionWatcher() {
  yield takeEvery(INIT_TRANSACTION_REQUEST, initTransactionFlow);
}
