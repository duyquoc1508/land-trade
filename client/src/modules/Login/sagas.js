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

const handleSignup = async publicAddress => {
  try {
    const result = await axios({
      url: `${process.env.REACT_APP_BASE_URL_API}/users`,
      data: { publicAddress },
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    return result.data;
  } catch (error) {
    alert(error);
  }

};

const handleAuthenticate = async (publicAddress, signature) => {
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL_API}/auth/login`,
      {
        publicAddress,
        signature
      }
    );
    return res.data.accessToken;
  } catch (error) {
    alert(error.message)
  }
};

const getNonce = async publicAddress => {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL_API}/users?publicAddress=${publicAddress}`
    );
    return res.data.data.nonce;
  } catch (error) {
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

const getInfoUser = async accessToken => {
  console.log("get", accessToken);
  let res = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL_API}/users/me`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data.data;
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
  if(!nonce){
    const result = await handleSignup(publicAddress);
    nonce = result.data.nonce;
  }
  let { signature } = await handleSignMessage(publicAddress, nonce);
  let accessToken = await handleAuthenticate(publicAddress, signature);
  Cookie.setCookie("accessToken", accessToken, 1 / 48);
  let user = await getInfoUser(accessToken);
  // console.log(accessToken, user);
  return { accessToken, user };
};

function* loginFlow() {
  try {
    const response = yield call(handleClick);
    yield put({ type: LOGIN_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error: error.message });
  }
}

function* loginWatcher() {
  return yield takeEvery(LOGIN_REQUESTING, loginFlow);
}

export default loginWatcher;
