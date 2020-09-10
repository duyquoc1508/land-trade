// component process of transaction
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BuyerAcceptTransaction from "./buyer/acceptTransaction";
import BuyerConfirmTransaction from "./buyer/confirmTransaction";
import BuyerPayment from "./buyer/payment";

import SellerAcceptTransaction from "./seller/acceptTransaction";
import SellerConfirmTransaction from "./seller/confirmTransaction";
import SellerPayment from "./seller/payment";

import CancelModal from "./cancelModal";
import StepOne from "./seller/step1";
import Canceled from "./canceled";

import {
  fetchTransactionRequest,
  cancelTransactionRequest,
  acceptTransactionSuccess,
  paymentTransactionSuccess,
  confirmTransactionSuccess,
  cancelTransactionSuccess,
} from "./action";

import InitTransaction from "../InitTransaction";
import NotFound from "../NotFound";

const Transaction = (props) => {
  // State of transaction
  const mapStateToSteps = {
    DEPOSIT_REQUEST: 1,
    DEPOSIT_CONFIRMED: 2,
    PAYMENT_REQUEST: 3,
    PAYMENT_CONFIRMED: 4,
    CANCELED: 5, // if state is cancel => redirect to info transaction
  };

  const MAX_STEPS = 4;
  const [currentSteps, setCurrentSteps] = useState(1); // = last step success
  const [steps, setSteps] = useState(2);
  const stepsToName = {
    1: "Yêu cầu đặt cọc",
    2: "Chấp nhận",
    3: "Thanh toán",
    4: "Xác nhận",
  };

  const styleLeftDot = {
    success: "bg-success",
    current: "bg-success",
    disabled: "bg-light",
  };

  const dotStyle = {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    paddingTop: "7px",
  };

  const PARTY_CONSTANT = {
    BUYER: "BUYER",
    SELLER: "SELLER",
    OUT_TRANSACTION: "OUT_TRANSACTION",
  };
  const [party, setParty] = useState(PARTY_CONSTANT.OUT_TRANSACTION); // party: BUYER - SELLER - OUT_TRANSACTION
  const [checkExpired, setCheckExpired] = useState(false);
  const transactionHash = props.match.params.transactionHash;

  // fetch transaction and tranding property
  useEffect(() => {
    props.fetchTransaction(transactionHash);
  }, [props.reload]);

  // check role of user in transaction
  useEffect(() => {
    if (props.transaction) {
      if (props.transaction.sellers.includes(props.user.publicAddress)) {
        setParty("SELLER");
      } else if (props.transaction.buyers.includes(props.user.publicAddress)) {
        setParty("BUYER");
      }
      const steps = mapStateToSteps[props.transaction.state];
      setCurrentSteps(steps);
      setSteps(steps >= MAX_STEPS ? steps : steps + 1);
      let timeEnd = new Date(props.transaction.timeEnd).getTime();
      if (timeEnd < Date.now()) {
        setCheckExpired(true);
      }
    }
  }, [props.transaction, props.user]);

  return !props.transaction ? (
    // <NotFound />
    ""
  ) : (
    <div className="ml-4 mr-4 mt-75">
      <div className="row">
        <div className="col-md-3">
          <div className="container py-2">
            <h4 className="">Quy trình giao dịch</h4>
            {/* timeline item 1 */}
            <div
              className="row"
              onClick={() => setSteps(1)}
              style={{ cursor: "pointer" }}
            >
              {/* timeline item 1 left dot */}
              <div className="col-auto text-center flex-column d-none d-sm-flex">
                <div className="row h-50">
                  <div className="col border-right">&nbsp;</div>
                  <div className="col">&nbsp;</div>
                </div>
                <h5 className="m-2">
                  <span
                    className="badge badge-pill bg-success "
                    style={dotStyle}
                  >
                    <i className="fa fa-check" style={{ color: "white" }}></i>
                  </span>
                </h5>
                <div className="row h-50">
                  <div className="col border-right">&nbsp;</div>
                  <div className="col">&nbsp;</div>
                </div>
              </div>

              {/* timeline item 1 event content */}
              <div className="col py-2">
                <div className="row">
                  <div className="col">&nbsp;</div>
                </div>
                <h5 className=" text-success">Yêu cầu đặt cọc</h5>
              </div>
            </div>
            {/*/row*/}
            {/* timeline item 2 */}
            <div
              className="row"
              onClick={currentSteps >= 1 ? () => setSteps(2) : null}
              style={{
                cursor: currentSteps >= 1 ? "pointer" : "not-allowed",
              }}
            >
              <div className="col-auto text-center flex-column d-none d-sm-flex">
                <div className="row h-50">
                  <div className="col border-right">&nbsp;</div>
                  <div className="col">&nbsp;</div>
                </div>
                <h5 className="m-2">
                  <span
                    className="badge badge-pill bg-success text-light"
                    style={dotStyle}
                  >
                    {currentSteps > 1 ? (
                      <i className="fa fa-check" style={{ color: "white" }}></i>
                    ) : (
                      2
                    )}
                  </span>
                </h5>

                <div className="row h-50">
                  <div className="col border-right">&nbsp;</div>
                  <div className="col">&nbsp;</div>
                </div>
              </div>

              <div className="col py-2">
                <div className="row">
                  <div className="col">&nbsp;</div>
                </div>
                <h5 className="text-success">Chấp nhận</h5>
              </div>
            </div>
            {/*/row*/}
            {/* timeline item 3 */}

            <div
              className="row"
              onClick={currentSteps >= 2 ? () => setSteps(3) : null}
              style={{
                cursor: currentSteps >= 2 ? "pointer" : "not-allowed",
              }}
            >
              <div className="col-auto text-center flex-column d-none d-sm-flex">
                <div className="row h-50">
                  <div className="col border-right">&nbsp;</div>
                  <div className="col">&nbsp;</div>
                </div>
                <h5 className="m-2">
                  {currentSteps > 2 ? (
                    <span
                      className="badge badge-pill bg-success text-light"
                      style={dotStyle}
                    >
                      <i className="fa fa-check" style={{ color: "white" }}></i>
                    </span>
                  ) : currentSteps == 2 ? (
                    <span
                      className="badge badge-pill bg-success text-light"
                      style={dotStyle}
                    >
                      3
                    </span>
                  ) : (
                    <span
                      className="badge badge-pill bg-secondary text-light"
                      style={dotStyle}
                    >
                      3
                    </span>
                  )}
                </h5>
                <div className="row h-50">
                  <div className="col border-right">&nbsp;</div>
                  <div className="col">&nbsp;</div>
                </div>
              </div>
              <div className="col py-2">
                <div className="row">
                  <div className="col">&nbsp;</div>
                </div>
                <h5
                  className={currentSteps >= 2 ? "text-success" : "text-muted"}
                >
                  Thanh toán
                </h5>
              </div>
            </div>
            {/*/row*/}
            {/* timeline item 4 */}
            <div
              className="row"
              onClick={currentSteps >= 3 ? () => setSteps(4) : null}
              style={{
                cursor: currentSteps >= 3 ? "pointer" : "not-allowed",
              }}
            >
              <div className="col-auto text-center flex-column d-none d-sm-flex">
                <div className="row h-50">
                  <div className="col border-right">&nbsp;</div>
                  <div className="col">&nbsp;</div>
                </div>
                <h5 className="m-2">
                  {currentSteps > 3 ? (
                    <span
                      className="badge badge-pill bg-success text-light"
                      style={dotStyle}
                    >
                      <i className="fa fa-check" style={{ color: "white" }}></i>
                    </span>
                  ) : currentSteps == 3 ? (
                    <span
                      className="badge badge-pill bg-success text-light"
                      style={dotStyle}
                    >
                      4
                    </span>
                  ) : (
                    <span
                      className="badge badge-pill bg-secondary text-light"
                      style={dotStyle}
                    >
                      4
                    </span>
                  )}
                </h5>
                <div className="row h-50">
                  <div className="col">&nbsp;</div>
                  <div className="col">&nbsp;</div>
                </div>
              </div>
              <div className="col py-2">
                <div className="row">
                  <div className="col">&nbsp;</div>
                </div>
                <h5
                  className={currentSteps >= 3 ? "text-success" : "text-muted"}
                >
                  Xác nhận
                </h5>
              </div>
            </div>

            <div className="row">
              {/* <button
                className="btn v3 float-right mt-5 "
                onClick={() =>
                  props.cancelTransaction(
                    props.transaction,
                    props.user.publicAddress
                  )
                }
              >
                <i className="ion-android-cancel"></i> Hủy bỏ giao dịch
              </button> */}
              <CancelModal
                party={party}
                checkExpired={checkExpired}
                history={props.history}
              />
            </div>
            {/*/row*/}
          </div>
        </div>
        {/** right collumn */}
        <div className="col-md-9">
          {/** step in process */}
          <div className="container py-2">
            {/* <h4 className="">{stepsToName[steps]}</h4>
            <h5 className="" style={{ color: "red" }}>
              {" "}
              {props.transaction.state}
            </h5> */}
            {party === PARTY_CONSTANT.SELLER
              ? (steps === 1 && <StepOne />) ||
                (steps === 2 && (
                  <SellerAcceptTransaction checkExpired={checkExpired} />
                )) ||
                (steps === 3 && <SellerPayment />) ||
                (steps === 4 && (
                  <SellerConfirmTransaction checkExpired={checkExpired} />
                ))
              : party === PARTY_CONSTANT.BUYER
              ? (steps === 1 && (
                  <SellerAcceptTransaction checkExpired={checkExpired} />
                )) ||
                (steps === 2 && <BuyerAcceptTransaction />) ||
                (steps === 3 && <BuyerPayment checkExpired={checkExpired} />) ||
                (steps === 4 && <BuyerConfirmTransaction />)
              : (steps === 1 && <BuyerAcceptTransaction />) ||
                (steps === 2 && <BuyerAcceptTransaction />) ||
                (steps === 3 && <SellerPayment />) ||
                (steps === 4 && <BuyerConfirmTransaction />)}

            {props.transaction.state === "CANCELED" && <Canceled />}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
    user: state.user.data,
    transactionContract: state.shared.transaction,
    reload: state.transaction.reload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTransaction: (idTransaction) => {
      dispatch(fetchTransactionRequest(idTransaction));
    },
    cancelTransaction: (transaction, publicAddress) => {
      dispatch(cancelTransactionRequest(transaction, publicAddress));
    },
    acceptTransactionSuccess: (txHash) => {
      dispatch(acceptTransactionSuccess(txHash));
    },
    paymentTransactionSuccess: (txHash) => {
      dispatch(paymentTransactionSuccess(txHash));
    },
    confirmTransactionSuccess: (txHash) => {
      dispatch(confirmTransactionSuccess(txHash));
    },
    cancelTransactionSuccess: (txHash) => {
      dispatch(cancelTransactionSuccess(txHash));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
