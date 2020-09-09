import { takeEvery, call, put } from "redux-saga/effects";
import {
  FETCH_LISTINGS_SALE,
  FETCH_LISTINGS_SALE_SUCCESS,
  FETCH_LISTINGS_SALE_ERROR,
} from "./constants";
import axios from "axios";
// import Cookie from "../../helper/cookie";

const handleClick = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pageNumber = urlParams.get("page");
  let response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL_API}/certification/selling`,
    params: {
      page: pageNumber,
      limit: 9,
    },
  });
  return response.data.data;
};

function* fetchListingSaleFlow() {
  try {
    const response = yield call(handleClick);
    yield put({ type: FETCH_LISTINGS_SALE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FETCH_LISTINGS_SALE_ERROR, payload: error.message });
  }
}

function* fetchListingSaleWatcher() {
  return yield takeEvery(FETCH_LISTINGS_SALE, fetchListingSaleFlow);
}

export default fetchListingSaleWatcher;
