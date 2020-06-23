import { takeEvery, call, put, select } from "redux-saga/effects";
import getWeb3 from "../../helper/getWeb3";
import TransactionContract from "../../contracts/Transaction.json";
import { transactionContractAddress } from "../../../config/common-path";
import { convertVNDtoETH } from "../../utils/convertCurrency";

import {
  INIT_TRANSACTION_REQUEST,
  INIT_TRANSACTION_SUCCESS,
  INIT_TRANSACTION_FAILURE,
} from "./constants";

const initContract = async () => {
  try {
    const web3 = await getWeb3();
    const transactionContract = new web3.eth.Contract(
      TransactionContract.abi,
      transactionContractAddress
    );
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }
    return { transactionContract, coinbase, web3 };
  } catch (error) {
    console.log(error);
  }
};

const createTransaction = async (data) => {
  try {
    const { transactionContract, coinbase, web3 } = await initContract();
    const {
      buyer,
      idPropertyInBlockchain,
      transferPrice,
      depositPrice,
      depositTime,
    } = data;
    const depositPriceEth = convertVNDtoETH(depositPrice);
    const depositPriceWei = web3.utils.toWei(
      depositPriceEth.toString(),
      "ether"
    );
    const transferPriceEth = convertVNDtoETH(transferPrice);
    const transferPriceWei = web3.utils.toWei(
      transferPriceEth.toString(),
      "ether"
    );
    web3.eth.getTransactionCount(coinbase, (error, txCount) => {
      if (error) {
        console.log(error);
      }
      console.log(txCount);
      transactionContract.methods
        .createTransaction(
          buyer,
          idPropertyInBlockchain,
          depositPriceWei,
          transferPriceWei,
          depositTime
        )
        .send(
          {
            from: coinbase,
            value: depositPriceWei,
          },
          function (error, transactionHash) {
            if (error) {
              throw error;
            } else {
              console.log(
                "%c%s",
                "color: green; font-weight: bold",
                `TxHash: ${transactionHash}`
              );
            }
          }
        );
    });
  } catch (error) {
    console.log(error);
  }
};

// const getSocket = (state) => state.header.socket;

// const getTransactionContract = (state) =>
//   state.instanceContracts.transactionContract;

// const emitEventInitTransition = (socket, participants) => {
//   socket.emit("new-transaction", participants);
// };

// const getBuyerAndSellerOfTransaction = (transaction) => {
//   const buyer = transaction.buyer;
//   const seller = transaction.seller;
//   return { buyer, seller };
// };

function* initTransactionRequestFlow(action) {
  try {
    // const { history } = action.payload;
    // const socket = yield select(getSocket);
    const response = yield call(createTransaction, action.payload.data);
    console.log("function*initTransactionRequestFlow -> response", response);
  } catch (error) {
    yield put({ type: INIT_TRANSACTION_FAILURE, payload: error.message });
    console.log(error);
  }
}

function* initTransactionSuccessFlow(action) {
  try {
    const { history } = action.payload;
    history.push(`/transaction/${action.payload.txHash}`);
    // popup notification for user
  } catch (error) {
    yield put({ type: INIT_TRANSACTION_FAILURE, payload: error.message });
    console.log(error);
  }
}

export default function* initTransactionWatcher() {
  yield takeEvery(INIT_TRANSACTION_REQUEST, initTransactionRequestFlow);
  yield takeEvery(INIT_TRANSACTION_SUCCESS, initTransactionSuccessFlow);
}
