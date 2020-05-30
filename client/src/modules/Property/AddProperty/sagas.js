import { takeEvery, call, put, select } from "redux-saga/effects";
import { CREATE_REQUESTING, CREATE_ERROR } from "./constants";
import axios from "axios";
import Cookie from "../../../helper/cookie";
import RealEstateContract from "../../../contracts/RealEstate.json";
import { realEstateContractAddress } from "../../../../config/common-path";
import { Base64 } from 'js-base64';
import getWeb3 from "../../../helper/getWeb3"

const handleCreateCert = async (property, transactionHash) => {
  console.log("handleCreateCert -> property", property);
  let response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL_API}/certification`,
    data: { ...property, transactionHash },
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return {
    success: true,
    errors: false,
    messages: [],
    data: response.data,
  };
};

async function initContract() {
  try {
    const web3 = await getWeb3();
    const realEstateContract = new web3.eth.Contract(
      RealEstateContract.abi,
      realEstateContractAddress
    );
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.")
      return;
    }
    return { realEstateContract, coinbase }
  } catch (error) {
    console.log(error);
  }
}

async function createCertificate(property) {
  try {
    const { realEstateContract, coinbase } = await initContract();
    let { owners, properties, images } = property;
    const propertyBase64 = objectToB64(properties)
    realEstateContract.methods
      .createCertificate(propertyBase64, owners)
      .send({ from: coinbase }, function (error, transactionHash) {
        console.log(
          "%c%s",
          "color: green; font-weight: bold",
          `TxHash: ${transactionHash}`
        );
        handleCreateCert(property, transactionHash);
      });
  } catch (error) {
    console.log(error);
  }
}

// convert object utf8 to base64
function objectToB64(property) {
  return Base64.encode(JSON.stringify(property))
}

// can using instance contract in store ??
// get instance of smart contract in store
const getInstanceContract = state => state.instanceContracts.realEstate;

function* createFlow(action) {
  try {
    const { property } = action;
    // const realEstateContract = yield select(getInstanceContract);
    yield call(createCertificate, property);
  } catch (error) {
    yield put({ type: CREATE_ERROR, payload: error.message });
  }
}

function* createWatcher() {
  return yield takeEvery(CREATE_REQUESTING, createFlow);
}

export default createWatcher;
