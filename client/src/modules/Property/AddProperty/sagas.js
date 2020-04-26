import { takeEvery, call, put, all } from "redux-saga/effects";
import { CREATE_REQUESTING, CREATE_SUCCESS, CREATE_ERROR } from "./constants";
import axios from "axios";
import Cookie from "../../../helper/cookie";
import RealEstateContract from "../../../contracts/RealEstate.json";
import Web3 from "web3";
const contractAddress =
  process.env.REAL_ESTATE_CONTRACT_ADDRESS ||
  "0x48D048682bE50991875a54FB6C177fbeffbc9492";

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

// param property.properties
function formatPropertyToSC(data) {
  const {
    landLot,
    house,
    otherConstruction,
    prodForestIsArtificial,
    perennialTree,
    notice,
  } = data.properties;
  let result = [
    landLot
      ? [
          landLot.landLotNo || 0,
          landLot.mapSheetNo || 0,
          landLot.commonUseArea || 0,
          landLot.privateUseArea || 0,
          landLot.address || "",
          landLot.purposeOfUse || "",
          landLot.timeOfUse || "",
          landLot.originOfUse || "",
        ]
      : [],
    house
      ? [
          house.houseType || "",
          house.address || "",
          house.constructionArea || 0,
          house.floorArea || 0,
          house.level || "",
          house.numberOfFloor || "",
          house.formOfOwn || "",
          house.timeOfOwn || "",
        ]
      : [],
    otherConstruction || "",
    prodForestIsArtificial || "",
    perennialTree || "",
    notice || "",
  ];
  return result;
}

async function createCertificate(property) {
  try {
    await loadWeb3();
    const { web3 } = window;
    const appContract = new web3.eth.Contract(
      RealEstateContract.abi,
      contractAddress
    );
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }
    const a = formatPropertyToSC(property);
    console.log(a);
    appContract.methods
      .createCertificate(formatPropertyToSC(property), property.owners)
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

function* createFlow(action) {
  try {
    let { property } = action;
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
