import { takeEvery, call, put } from "redux-saga/effects";
import { CANCEL_SALE_REQUEST, CANCEL_SALE_REQUEST_SUCCESS, CANCEL_SALE_REQUEST_FAILURE } from "./constanst";
import axios from "axios";
import Cookie from "../../../helper/cookie";

const cancelSale = async (idCertificate) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BASE_URL_API}/certification/cancel-sale/${idCertificate}`,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return response.data.data
}

function* cancelSaleFlow(action) {
  try {
    const response = yield call(cancelSale, action.payload)
    yield put({ type: CANCEL_SALE_REQUEST_SUCCESS, payload: response });
    yield put({ type: "FETCH_MY_LISTING_REQUEST" })
  } catch (error) {
    yield put({ type: CANCEL_SALE_REQUEST_FAILURE, payload: error.message })
  }
}

export default function* watchCancelSale() {
  yield takeEvery(CANCEL_SALE_REQUEST, cancelSaleFlow)
}
