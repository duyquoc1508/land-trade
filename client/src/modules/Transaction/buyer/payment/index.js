import React from "react";
import { connect } from "react-redux";
import { paymentRequest } from "./action";
const Payment = (props) => {
  return (
    <div>
      <h1>Giao diện bên mua</h1>
      <p>Giao diện thanh toán phần còn lại</p>
      <button
        className="btn v3 float-right mt-5 "
        onClick={() => props.paymentRequest(props.transaction)}
      >
        <i className="ion-android-cancel"></i> Chuyển số tiền còn lại
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { transaction: state.transaction.data };
};

const mapDispatchToProps = (dispatch) => {
  return {
    paymentRequest: (idTransaction) => {
      dispatch(paymentRequest(idTransaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
