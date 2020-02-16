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
  return fetch(`http://localhost:3000/api/v1/users`, {
    body: JSON.stringify({ publicAddress }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(response => response.json());
};

const handleAuthenticate = async (publicAddress, signature) => {
  let res = await axios.post("http://localhost:3000/api/v1/auth/login", {
    publicAddress,
    signature
  });
  return res.data.access_token;
};

const getNonce = async publicAddress => {
  try {
    let res = await axios.get(
      `http://localhost:3000/api/v1/users?publicAddress=${publicAddress}`
    );
    return res.data.data.nonce;
  } catch (error) {
    handleSignup(publicAddress);
    return getNonce(publicAddress);
  }
};

const handleClick = async () => {
  const coinbase = await window.web3.eth.getCoinbase();
  if (!coinbase) {
    window.alert("Please activate MetaMask first.");
    return;
  }
  const publicAddress = coinbase.toLowerCase();

  let nonce = await getNonce(publicAddress);

  // console.log(nonce);
  let { signature } = await handleSignMessage(publicAddress, nonce);
  // console.log(signature);
  let accessToken = await handleAuthenticate(publicAddress, signature);
  console.log(accessToken);
  return accessToken;
};

function* loginFlow() {
  try {
    const response = yield call(handleClick);
    // console.log(response);
    yield put({ type: LOGIN_SUCCESS, accessToken: response });
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error: error.message });
  }
}

function* loginWatcher() {
  yield takeEvery(LOGIN_REQUESTING, loginFlow);
}

export default loginWatcher;
