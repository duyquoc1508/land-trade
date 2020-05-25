import { takeEvery, call, put } from "redux-saga/effects";
import { CREATE_REQUESTING, CREATE_SUCCESS, CREATE_ERROR } from "./constants";
import axios from "axios";
import Cookie from "../../../helper/cookie";
import RealEstateContract from "../../../contracts/RealEstate.json";
import Web3 from "web3";
import { realEstateContractAddress } from "../../../../config/common-path";

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

async function createCertificate(property) {
  try {
    await loadWeb3();
    const { web3 } = window;
    const appContract = new web3.eth.Contract(
      RealEstateContract.abi,
      realEstateContractAddress
    );
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }
    let { owners, properties, images } = property;
    // console.log(owners, properties, images);
    appContract.methods
      .createCertificate(formatPropertyToString(properties), owners)
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

function formatPropertyToString(property) {
  return JSON.stringify(property).replace(/"/g, "'");
}

function* createFlow(action) {
  try {
    let { property } = action;

    console.log(`property ${JSON.stringify(property)}`);
    // id for listen event from blockchain and update data in server
    // property.idCert = idCertificate;
    // console.log("function*createFlow -> property", property)
    // const response = yield call(createCertificate, property);

    const resFromBlockChain = yield call(createCertificate, property);
    // const resFromServer = yield call(handleClick, property);
    // const [resFromServer, resFromBlockChain] = yield all([
    //   call(handleClick, property),
    //   call(createCertificate, property)
    // ])
    // console.log("function*createFlow -> resFromServer", resFromServer);
    console.log("function*createFlow -> resFromBlockChain", resFromBlockChain);
    yield put({ type: CREATE_SUCCESS, payload: resFromBlockChain });
  } catch (error) {
    yield put({ type: CREATE_ERROR, payload: error.message });
  }
}

function* createWatcher() {
  return yield takeEvery(CREATE_REQUESTING, createFlow);
}

export default createWatcher;
