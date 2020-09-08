import { all } from "redux-saga/effects";
import loginSaga from "../modules/Login/sagas";
import createSaga from "../modules/Property/AddProperty/sagas";
import listingSaga from "../modules/Property/ListProperties/sagas";
import listingSaleSaga from "../modules/Listings/sagas";
import notificationsSaga from "../components/Header/Notifications/saga";
import confirmProperty from "../modules/Property/ConfirmProperty/saga";
import propertyStandard from "../modules/Property/PropertyStandard/saga";
import shared from "../modules/Shared/saga";
import propertySelling from "../modules/Property/PropertySelling/saga";
import propertyActivated from "../modules/Property/PropertyActivated/saga";
import initTransaction from "../modules/InitTransaction/saga";
import transaction from "../modules/Transaction/saga";
import role from "../modules/Role/saga";

function* rootSaga() {
  // yield loginSaga();
  yield all([
    loginSaga(),
    createSaga(),
    listingSaga(),
    listingSaleSaga(),
    notificationsSaga(),
    confirmProperty(),
    propertyStandard(),
    shared(),
    propertySelling(),
    propertyActivated(),
    initTransaction(),
    transaction(),
    role(),
  ]);
}

export default rootSaga;
