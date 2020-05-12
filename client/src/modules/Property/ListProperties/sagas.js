import { takeEvery, call, put } from "redux-saga/effects";
import {
  FETCH_MY_LISTING_REQUEST,
  FETCH_MY_LISTING_SUCCESS,
  FETCH_MY_LISTING_ERROR,
} from "./constants";
import axios from "axios";
import Cookie from "../../../helper/cookie";

const handleClick = async () => {
  let response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL_API}/users/properties`,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return response.data.data.properties;
};

function* fetchListingFlow() {
  try {
    const response = yield call(handleClick);
    yield put({ type: FETCH_MY_LISTING_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FETCH_MY_LISTING_ERROR, payload: error.message });
  }
}

function* fetchListingWatcher() {
  return yield takeEvery(FETCH_MY_LISTING_REQUEST, fetchListingFlow);
}

export default fetchListingWatcher;
