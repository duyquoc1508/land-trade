import { takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import Cookie from "../../../helper/cookie";
import { ACTIVATE_SALE_REQUEST, ACTIVATE_SALE_SUCCESS, ACTIVATE_SALE_FAILURE } from "./constants";

const activateSale = async (idCertificate) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BASE_URL_API}/certification/sale/${idCertificate}`,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return response.data.data;
}

function* activateSaleFlow(action) {
  try {
    const response = yield call(activateSale, action.payload);
    yield put({ type: ACTIVATE_SALE_SUCCESS, payload: response });
    yield put({ type: "FETCH_MY_LISTING_REQUEST" });
  } catch (error) {
    yield put({ type: ACTIVATE_SALE_FAILURE, payload: error.message });
  }
}

export default function* watchActivateSale() {
  yield takeEvery(ACTIVATE_SALE_REQUEST, activateSaleFlow);
}
