import { put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_SINGLE_PROPERTY_SUCCESS,
  FETCH_SINGLE_PROPERTY_FAILURE,
  FETCH_SINGLE_PROPERTY_REQUEST,
} from "./constants";

const fetchSingleProperty = async (txHash) => {
  const response = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BASE_URL_API}/certification/${txHash}`,
  });
  return response.data.data;
};

function* fetchSinglePropertyFlow(action) {
  try {
    const response = yield call(fetchSingleProperty, action.payload);
    yield put({ type: FETCH_SINGLE_PROPERTY_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FETCH_SINGLE_PROPERTY_FAILURE, payload: error.message });
  }
}

export default function* watchFetchSingleProperty() {
  yield takeEvery(FETCH_SINGLE_PROPERTY_REQUEST, fetchSinglePropertyFlow);
}
