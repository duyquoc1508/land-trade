import { all } from "redux-saga/effects";

import loginSaga from "../pages/Login/sagas";
import createSage from "../pages/AddProperty/sagas";

function* rootSaga() {
  // yield loginSaga();
  yield all([loginSaga(), createSage()]);
}

export default rootSaga;
