import { takeEvery, call, put } from "redux-saga/effects";
import { CREATE_REQUESTING, CREATE_SUCCESS, CREATE_ERROR } from "./constants";
import axios from "axios";
import Cookie from "../../helper/cookie";

const handleClick = async property => {
  // console.log(typeof property);
  let response = await axios({
    method: "post",
    url: `${process.env.BASE_URL_API}/certification`,
    data: property,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`
    }
  });
  return {
    requesting: true,
    success: true,
    errors: [],
    messages: [],
    data: response.data
  };
};

function* createFlow(action) {
  try {
    // console.log(action);
    let { property } = action;
    const response = yield call(handleClick, property);
    // console.log(response);
    yield put({ type: CREATE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: CREATE_ERROR, payload: error.message });
  }
}

function* createWatcher() {
  return yield takeEvery(CREATE_REQUESTING, createFlow);
}

export default createWatcher;
