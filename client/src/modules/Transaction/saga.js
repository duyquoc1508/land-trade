import { takeEvery, call, put, select, all } from "redux-saga/effects";
import axios from "axios";
import getWeb3 from "../../helper/getWeb3";

import {
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_FAILURE,
  FETCH_TRADING_PROPERTY_SUCCESS,
  CANCEL_TRANSACTION_REQUEST,
  CANCEL_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
  CANCEL_TRANSACTION_FAILURE,
  ACCEPT_TRANSACTION_REQUEST,
  ACCEPT_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
  ACCEPT_TRANSACTION_FAILURE,
  CONFIRM_TRANSACTION_REQUEST,
  CONFIRM_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
  CONFIRM_TRANSACTION_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_WAIT_BLOCKCHAIN_CONFIRM,
  PAYMENT_FAILURE,
} from "./constants";
import Cookie from "../../helper/cookie";

// state of transaction in mongodb
const TRANSACTION_STATE = {
  DEPOSIT_REQUEST: "DEPOSIT_REQUEST",
  DEPOSIT_CONFIRMED: "DEPOSIT_CONFIRMED",
  PAYMENT_REQUEST: "PAYMENT_REQUEST",
  PAYMENT_CONFIRMED: "PAYMENT_CONFIRMED",
};

const fetchTransaction = async (txHash) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL_API}/transaction/${txHash}`,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return response.data.data;
};

const fetchPropertyTrading = async (idProperty) => {
  const response = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BASE_URL_API}/certification/id-in-blockchain/${idProperty}`,
    headers: {
      Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
    },
  });
  return response.data.data;
};

function* fetchTransactionFlow(action) {
  try {
    const transaction = yield call(fetchTransaction, action.payload);
    yield put({ type: FETCH_TRANSACTION_SUCCESS, payload: transaction });
    const property = yield call(
      fetchPropertyTrading,
      transaction.idPropertyInBlockchain
    );
    yield put({ type: FETCH_TRADING_PROPERTY_SUCCESS, payload: property });
  } catch (error) {
    yield put({ type: FETCH_TRANSACTION_FAILURE, payload: error.message });
  }
}

// accept transaction (same sign the deposit contract)
const acceptTransaction = async (transactionContract, idTransaction) => {
  return new Promise((resolve, reject) => {
    let web3 = "";
    getWeb3()
      .then((result) => {
        web3 = result;
        return web3.eth.getCoinbase();
      })
      .then((coinbase) => {
        web3.eth.getTransactionCount(coinbase, (error, txCount) => {
          if (error) {
            reject(error);
          }
          transactionContract.methods
            .acceptTransaction(idTransaction)
            .send(
              {
                nonce: txCount,
                from: coinbase,
              },
              function (error, transactionHash) {
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

// send remaining amount + 0.5% tax
const payment = async (transactionContract, transaction) => {
  return new Promise((resolve, reject) => {
    let web3 = "";
    getWeb3()
      .then((result) => {
        web3 = result;
        return web3.eth.getCoinbase();
      })
      .then((coinbase) => {
        web3.eth.getTransactionCount(coinbase, (error, txCount) => {
          if (error) {
            reject(error);
          }
          const remainingAmount = web3.utils
            .toBN(transaction.transferPrice)
            .sub(web3.utils.toBN(transaction.depositPrice));
          const personalTax = web3.utils
            .toBN(transaction.transferPrice)
            .div(web3.utils.toBN(200)); // 0.5% tax
          const totalValue = remainingAmount.add(personalTax);
          console.log(totalValue.toString());
          transactionContract.methods
            .payment(transaction.idInBlockchain)
            .send(
              {
                nonce: txCount,
                from: coinbase,
                value: web3.utils.toWei(totalValue, "wei"), // include 0.5% tax
                // value: web3.utils.toWei("32986135155378261525", "wei"),
              },
              function (error, transactionHash) {
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

// receive eth and change transfer ownership. The amount received is deducted by 2% tax
const confirmTransaction = async (transactionContract, transaction) => {
  return new Promise((resolve, reject) => {
    let web3 = "";
    getWeb3()
      .then((result) => {
        web3 = result;
        return web3.eth.getCoinbase();
      })
      .then((coinbase) => {
        const personalIncomeTax = web3.utils
          .toBN(transaction.transferPrice)
          .div(web3.utils.toBN(50)); //2% tax
        console.log(personalIncomeTax);
        const remainingAmount = web3.utils
          .toBN(transaction.transferPrice)
          .sub(web3.utils.toBN(transaction.depositPrice));
        console.log(remainingAmount);
        let value = "0";
        // If the remaining amount is less than the tax amount, the value must be submitted to pay tax
        if (remainingAmount.lt(personalIncomeTax)) {
          value = personalIncomeTax.sub(remainingAmount);
        }
        console.log(value);
        web3.eth.getTransactionCount(coinbase, (error, txCount) => {
          if (error) {
            reject(error);
          }

          const personalIncomeTax = web3.utils
            .toBN(transaction.transferPrice)
            .div(web3.utils.toBN(50)); //2% tax
          const remainingAmount = web3.utils
            .toBN(transaction.transferPrice)
            .sub(web3.utils.toBN(transaction.depositPrice));
          let value = "0";
          // If the remaining amount is less than the tax amount, the value must be submitted to pay tax
          if (remainingAmount.lt(personalIncomeTax)) {
            value = personalIncomeTax.sub(remainingAmount);
          }
          transactionContract.methods
            .confirmTransaction(transaction.idInBlockchain)
            .send(
              {
                nonce: txCount,
                from: coinbase,
                value: web3.utils.toWei(value, "wei"),
              },
              function (error, transactionHash) {
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

// get value to send depending on state of transaction
const getValueDependingStateTransaction = (web3, transaction) => {
  let value = "0";
  switch (transaction.state) {
    case TRANSACTION_STATE.DEPOSIT_REQUEST:
      return value;
    case TRANSACTION_STATE.DEPOSIT_CONFIRMED:
    case TRANSACTION_STATE.PAYMENT_REQUEST:
      value = web3.utils.toBN(transaction.depositPrice).mul(web3.utils.toBN(2)); // representative deposit contract = 2x deposit price
      return value;
    default:
      throw new Error("State is not allowed cancel");
  }
};

const cancelTransaction = (
  transactionContract,
  { transaction, publicAddress }
) => {
  // check state of transaction => allow cancel
  // buyer cancel transaction with fee equal to 0 ETH
  if (transaction.buyers.includes(publicAddress)) {
    return new Promise((resolve, reject) => {
      let web3 = "";
      getWeb3()
        .then((result) => {
          web3 = result;
          return web3.eth.getCoinbase();
        })
        .then((coinbase) => {
          web3.eth.getTransactionCount(coinbase, (error, txCount) => {
            if (error) {
              reject(error);
            }
            transactionContract.methods
              .buyerCancelTransaction(transaction.idInBlockchain)
              .send(
                {
                  nonce: txCount,
                  from: coinbase,
                },
                function (error, transactionHash) {
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
    // seller cancel transaction
  } else if (transaction.sellers.includes(publicAddress)) {
    return new Promise((resolve, reject) => {
      let web3 = "";
      getWeb3()
        .then((result) => {
          web3 = result;
          return web3.eth.getCoinbase();
        })
        .then((coinbase) => {
          web3.eth.getTransactionCount(coinbase, (error, txCount) => {
            if (error) {
              reject(error);
            }
            // get msg.value depending on current state of transaction
            const value = getValueDependingStateTransaction(web3, transaction);
            transactionContract.methods
              .sellerCancelTransaction(transaction.idInBlockchain)
              .send(
                {
                  nonce: txCount,
                  from: coinbase,
                  value: web3.utils.toWei(value, "wei"),
                },
                function (error, transactionHash) {
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
  } else {
    throw new Error("User doesn't permission!");
  }
};

const getTransactionContract = (state) => state.shared.transaction;

function* cancelTransactionFlow(action) {
  try {
    const transactionContract = yield select(getTransactionContract);
    const transactionHash = yield call(
      cancelTransaction,
      transactionContract,
      action.payload
    );
    yield put({
      type: CANCEL_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
      payload: transactionHash,
    });
  } catch (error) {
    yield put({ type: CANCEL_TRANSACTION_FAILURE, payload: error.message });
  }
}

function* acceptTransactionFlow(action) {
  try {
    const transactionContract = yield select(getTransactionContract);
    const transactionHash = yield call(
      acceptTransaction,
      transactionContract,
      action.payload
    );
    yield put({
      type: ACCEPT_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
      payload: transactionHash,
    });
  } catch (error) {
    yield put({ type: ACCEPT_TRANSACTION_FAILURE, payload: error.message });
  }
}

function* paymentFlow(action) {
  try {
    const transactionContract = yield select(getTransactionContract);
    const transactionHash = yield call(
      payment,
      transactionContract,
      action.payload
    );
    yield put({
      type: PAYMENT_WAIT_BLOCKCHAIN_CONFIRM,
      payload: transactionHash,
    });
  } catch (error) {
    yield put({ type: PAYMENT_FAILURE, payload: error.message });
  }
}

function* confirmTransactionFlow(action) {
  try {
    const transactionContract = yield select(getTransactionContract);
    const transactionHash = yield call(
      confirmTransaction,
      transactionContract,
      action.payload
    );
    yield put({
      type: CONFIRM_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
      payload: transactionHash,
    });
  } catch (error) {
    yield put({ type: CONFIRM_TRANSACTION_FAILURE, payload: error.message });
  }
}

function* transactionWatcher() {
  yield all([
    takeEvery(FETCH_TRANSACTION_REQUEST, fetchTransactionFlow),
    takeEvery(CANCEL_TRANSACTION_REQUEST, cancelTransactionFlow),
    takeEvery(ACCEPT_TRANSACTION_REQUEST, acceptTransactionFlow),
    takeEvery(PAYMENT_REQUEST, paymentFlow),
    takeEvery(CONFIRM_TRANSACTION_REQUEST, confirmTransactionFlow),
  ]);
}

export default transactionWatcher;
