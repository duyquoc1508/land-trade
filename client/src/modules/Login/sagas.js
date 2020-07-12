import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import axios from "axios";
import Cookie from "../../helper/cookie";
import Web3 from "web3";
// import io from "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.dev.js.map";

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

const handleSignup = async (publicAddress) => {
  try {
    const result = await axios({
      url: `${process.env.REACT_APP_BASE_URL_API}/users`,
      data: { publicAddress },
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
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
        signature,
      }
    );
    return res.data.accessToken;
  } catch (error) {
    alert(error.message);
  }
};

const getNonce = async (publicAddress) => {
  try {
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL_API}/users/check_registed?publicAddress=${publicAddress}`
    );
    return res.data.data.nonce;
  } catch (error) {}
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

const getInfoUser = async (accessToken) => {
  console.log("get", accessToken);
  let res = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL_API}/users/me`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data.data;
};
const handleClick = async () => {
  try {
    await loadWeb3();
    const publicAddress = await window.web3.eth
      .getAccounts()
      .then((accounts) => accounts[0]);
    if (!publicAddress) {
      window.alert("Please activate MetaMask first.");
      return;
    }
    console.log(publicAddress);
    let nonce = await getNonce(publicAddress);
    if (!nonce) {
      const result = await handleSignup(publicAddress);
      nonce = result.data.nonce;
    }
    let { signature } = await handleSignMessage(publicAddress, nonce);
    let accessToken = await handleAuthenticate(publicAddress, signature);
    // 1 day
    Cookie.setCookie("accessToken", accessToken);
    let currentTime = new Date();
    let expiredTime = currentTime.setMinutes(
      currentTime.getMinutes() + 24 * 60
    );
    Cookie.setCookie("expiredToken", expiredTime, 1);
    let user = await getInfoUser(accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    // console.log(accessToken, user);
    return { accessToken, user };
  } catch (error) {
    console.log(error.message);
  }
};

function* loginFlow() {
  try {
    const response = yield call(handleClick);
    const { publicAddress } = response.user;
    yield put({ type: LOGIN_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error: error.message });
  }
}

function* loginWatcher() {
  return yield takeEvery(LOGIN_REQUESTING, loginFlow);
}

export default loginWatcher;
