import { all } from "redux-saga/effects";

import loginSaga from "../modules/Login/sagas";
import createSaga from "../modules/Property/AddProperty/sagas";
import listingSaga from "../modules/Property/ListProperties/sagas";
import listingSaleSaga from "../modules/Listings/sagas";

function* rootSaga() {
  // yield loginSaga();
  yield all([loginSaga(), createSaga(), listingSaga(), listingSaleSaga()]);
}

export default rootSaga;
