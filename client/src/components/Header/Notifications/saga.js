import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";
import Cookie from "../../../helper/cookie";
import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  READ_NOTIFICATION,
} from "./constants";

const fetchNotificationsFromApi = async () => {
  const response = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BASE_URL_API}/notification`,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
    params: { page: 1, limit: 3 },
  });
  return response.data.data;
};

function* fetchNotifications() {
  try {
    const response = yield call(fetchNotificationsFromApi);
    yield put({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FETCH_NOTIFICATIONS_FAILURE, payload: error.message });
  }
}

export default function* watchFetchNotifications() {
  yield takeEvery(
    [
      FETCH_NOTIFICATIONS_REQUEST,
      READ_NOTIFICATION,
      "REFRESH_PAGE",
      "NEW_NOTIFICATION",
    ],
    fetchNotifications
  );
}
