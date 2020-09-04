import { takeEvery, call, put, select, all } from "redux-saga/effects";
import {
  ADD_ROLE_REQUEST,
  ADD_ROLE_WAIT_BLOCKCHAIN_CONFIRM,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAILURE,
  REMOVE_ROLE_REQUEST,
  REMOVE_ROLE_WAIT_BLOCKCHAIN_CONFIRM,
  REMOVE_ROLE_SUCCESS,
  REMOVE_ROLE_FAILURE,
} from "./constants";
import getWeb3 from "../../helper/getWeb3";

function addRole(roleBasedContract, data) {
  const { publicAddress, role } = data;
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
          roleBasedContract.methods
            .addRole(publicAddress, role)
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
}

function removeRole(roleBasedContract, data) {
  const { publicAddress, role } = data;
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
          roleBasedContract.methods
            .removeRole(publicAddress, role)
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
}

// get instance of smart contract in store
const getInstanceContract = (state) => state.shared.roleBasedAcl;

function* addRoleFlow(action) {
  try {
    const roleBasedContract = yield select(getInstanceContract);
    const response = yield call(addRole, roleBasedContract, action.payload);
    yield put({ type: ADD_ROLE_WAIT_BLOCKCHAIN_CONFIRM, payload: response });
  } catch (error) {
    yield put({ type: ADD_ROLE_FAILURE, payload: error.message });
  }
}

function* removeRoleFlow(action) {
  try {
    const roleBasedContract = yield select(getInstanceContract);
    const response = yield call(removeRole, roleBasedContract, action.payload);
    yield put({ type: REMOVE_ROLE_WAIT_BLOCKCHAIN_CONFIRM, payload: response });
  } catch (error) {
    yield put({ type: REMOVE_ROLE_FAILURE, payload: error.message });
  }
}

function* roleWatcher() {
  yield all([
    takeEvery(ADD_ROLE_REQUEST, addRoleFlow),
    takeEvery(REMOVE_ROLE_REQUEST, removeRoleFlow),
  ]);
}

export default roleWatcher;
