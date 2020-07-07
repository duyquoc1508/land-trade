// component process of transaction
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchTransactionRequest } from "./action";
import formatDate from "../../utils/formatDate";
import TransactionInfo from "../TransactionInfo";

import BuyerAcceptTransaction from "../Transaction/buyer/acceptTransaction";
import BuyerConfirmTransaction from "../Transaction/buyer/confirmTransaction";
import BuyerPayment from "../Transaction/buyer/payment";

import SellerAcceptTransaction from "../Transaction/seller/acceptTransaction";
import SellerConfirmTransaction from "../Transaction/seller/confirmTransaction";
import SellerPayment from "../Transaction/seller/payment";

import InitTransaction from ".";
import { Step } from "@material-ui/core";

const Steps = (props) => {
  // State of transaction

  const MAX_STEPS = 4;
  const [currentSteps, setCurrentSteps] = useState(1); // = last step success
  const [steps, setSteps] = useState(2);
  const stepsToName = {
    "1": "Yêu cầu đặt cọc",
    "2": "Chấp nhận",
    "3": "Thanh toán",
    "4": "Xác nhận",
  };

  const dotStyle = {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    paddingTop: "7px",
  };

  return (
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
              className="badge badge-pill bg-success text-light"
              style={dotStyle}
            >
              1
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
          <h5 className=" text-success">Yêu cầu đặc cọc</h5>
        </div>
      </div>
      {/*/row*/}
      {/* timeline item 2 */}
      <div
        className="row"
        style={{
          cursor: "not-allowed",
        }}
      >
        <div className="col-auto text-center flex-column d-none d-sm-flex">
          <div className="row h-50">
            <div className="col border-right">&nbsp;</div>
            <div className="col">&nbsp;</div>
          </div>
          <h5 className="m-2">
            <span
              className="badge badge-pill bg-secondary text-light"
              style={dotStyle}
            >
              2
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
          <h5 className="text-muted">Chấp nhận</h5>
        </div>
      </div>
      {/*/row*/}
      {/* timeline item 3 */}

      <div
        className="row"
        style={{
          cursor: "not-allowed",
        }}
      >
        <div className="col-auto text-center flex-column d-none d-sm-flex">
          <div className="row h-50">
            <div className="col border-right">&nbsp;</div>
            <div className="col">&nbsp;</div>
          </div>
          <h5 className="m-2">
            <span
              className="badge badge-pill bg-secondary text-light"
              style={dotStyle}
            >
              3
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
          <h5 className="text-muted">Thanh toán</h5>
        </div>
      </div>
      {/*/row*/}
      {/* timeline item 4 */}
      <div
        className="row"
        style={{
          cursor: "not-allowed",
        }}
      >
        <div className="col-auto text-center flex-column d-none d-sm-flex">
          <div className="row h-50">
            <div className="col border-right">&nbsp;</div>
            <div className="col">&nbsp;</div>
          </div>
          <h5 className="m-2">
            <span
              className="badge badge-pill bg-secondary text-light"
              style={dotStyle}
            >
              4
            </span>
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
          <h5 className="text-muted">Xác nhận</h5>
        </div>
      </div>
    </div>
  );
};

export default Steps;
