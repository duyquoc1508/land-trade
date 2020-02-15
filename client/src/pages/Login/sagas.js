import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import axios from "axios";

const handleSignMessage = async (publicAddress, nonce) => {
  try {
    const signature = await window.web3.eth.personal.sign(
      window.web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
      publicAddress,
      "" // MetaMask will ignore the password argument here
    );
    return { publicAddress, signature };
  } catch (err) {
    throw new Error("You need to sign the message to be able to log in.");
  }
};

const handleSignup = publicAddress => {
  return fetch(`http://localhost:8001/api/v1/users`, {
    body: JSON.stringify({ publicAddress }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(response => response.json());
};

const handleAuthenticate = async (publicAddress, signature) => {
  let res = await axios.post("http://localhost:8001/api/v1/auth/login", {
    publicAddress,
    signature
  });
  return res.data.token;
};

const handleClick = async () => {
  const coinbase = await window.web3.eth.getCoinbase();
  if (!coinbase) {
    window.alert("Please activate MetaMask first.");
    return;
  }
  const publicAddress = coinbase.toLowerCase();

  try {
    let res = await axios.get(
      `http://localhost:8001/api/v1/users?publicAddress=${publicAddress}`
    );
    if (!res.data.user) {
      handleSignup(publicAddress);
    }
    let { signature } = await handleSignMessage(
      publicAddress,
      res.data.user.nonce
    );
    let acessToken = await handleAuthenticate(publicAddress, signature);
    return acessToken;
  } catch (err) {
    return err.message;
  }
};

function* loginFlow() {
  try {
    const response = yield call(handleClick);
    yield put({ type: LOGIN_SUCCESS, accessToken: response });
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error: error.message });
  }
}

function* loginWatcher() {
  yield takeEvery(LOGIN_REQUESTING, loginFlow);
}

export default loginWatcher;
