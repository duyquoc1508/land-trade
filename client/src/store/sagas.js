import { all } from "redux-saga/effects";

import loginSaga from "../modules/Login/sagas";
import createSaga from "../modules/Property/AddProperty/sagas";
import listingSaga from "../modules/Property/ListProperties/sagas";
import listingSaleSaga from "../modules/Listings/sagas";
import notificationsSaga from "../components/Header/Notifications/saga";
import confirmProperty from "../modules/Property/ConfirmProperty/saga";
import propertyDetail from "../modules/Property/PropertyDetail/saga";

function* rootSaga() {
  // yield loginSaga();
  yield all([
    loginSaga(),
    createSaga(),
    listingSaga(),
    listingSaleSaga(),
    notificationsSaga(),
    confirmProperty(),
    propertyDetail(),
  ]);
}

export default rootSaga;
