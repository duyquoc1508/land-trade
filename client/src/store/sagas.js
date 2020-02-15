import loginSaga from "../pages/Login/sagas";

function* rootSaga() {
  yield loginSaga();
}

export default rootSaga;
