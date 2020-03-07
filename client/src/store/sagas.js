import { all } from "redux-saga/effects";

import loginSaga from "../modules/Login/sagas";
import createSage from "../modules/Property/AddProperty/sagas";

function* rootSaga() {
  // yield loginSaga();
  yield all([loginSaga(), createSage()]);
}

export default rootSaga;
