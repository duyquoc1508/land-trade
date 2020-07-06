import { takeEvery, call, put, select } from "redux-saga/effects";
import getWeb3 from "../../helper/getWeb3";
import { convertVNDtoETH } from "../../utils/convertCurrency";

import {
  INIT_TRANSACTION_REQUEST,
  INIT_TRANSACTION_SUCCESS,
  INIT_TRANSACTION_FAILURE,
  INIT_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
} from "./constants";

const createTransaction = (transactionContract, data) => {
  return new Promise((resolve, reject) => {
    let web3 = "";
    getWeb3()
      .then((result) => {
        web3 = result;
        return web3.eth.getCoinbase();
      })
      .then((coinbase) => {
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
            reject(error);
          }
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
                nonce: txCount,
                from: coinbase,
                value: depositPriceWei,
              },
              (error, transactionHash) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(transactionHash);
                }
              }
            )
            .catch((error) => {
              reject(error);
            });
        });
      });
  });
};

const getTransactionContract = (state) => state.shared.transaction;

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
    const transactionContract = yield select(getTransactionContract);
    const response = yield call(
      createTransaction,
      transactionContract,
      action.payload.data
    );
    // put action wait blockchain confirm for popup process (after sign transaction)
    yield put({
      type: INIT_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
      payload: response,
    });
  } catch (error) {
    yield put({ type: INIT_TRANSACTION_FAILURE, payload: error.message });
  }
}

// listen event from blockchain
function* initTransactionSuccessFlow(action) {
  try {
    const { history } = action.payload;
    history.push(`/transaction/${action.payload.txHash}`);
    // popup notification for user
  } catch (error) {
    yield put({ type: INIT_TRANSACTION_FAILURE, payload: error.message });
  }
}

export default function* initTransactionWatcher() {
  yield takeEvery(INIT_TRANSACTION_REQUEST, initTransactionRequestFlow);
  yield takeEvery(INIT_TRANSACTION_SUCCESS, initTransactionSuccessFlow);
}
