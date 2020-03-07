import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import axios from "axios";
import Cookie from "../../helper/cookie";
import Web3 from "web3";

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
  return fetch(`${process.env.REACT_APP_BASE_URL_API}/users`, {
    body: JSON.stringify({ publicAddress }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(response => response.json());
};

const handleAuthenticate = async (publicAddress, signature) => {
  let res = await axios.post(
    `${process.env.REACT_APP_BASE_URL_API}/auth/login`,
    {
      publicAddress,
      signature
    }
  );
  return res.data.accessToken;
};

const getNonce = async publicAddress => {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL_API}/users?publicAddress=${publicAddress}`
    );
    return res.data.data.nonce;
  } catch (error) {
    handleSignup(publicAddress);
    return getNonce(publicAddress);
  }
};
const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};
const handleClick = async () => {
  await loadWeb3();
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
  // console.log(accessToken);
  Cookie.setCookie("accessToken", accessToken, 1 / 48);
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
  return yield takeEvery(LOGIN_REQUESTING, loginFlow);
}

export default loginWatcher;
