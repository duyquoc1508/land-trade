import React from "react";
import { connect } from "react-redux";

const StepOne = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details text-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/pending-payment.png`}
            width="150"
            className="my-50"
          />
          <h5 className="mb-5">Bạn có lời đề nghị đặt cọc</h5>
          <p> Chúc bạn mua bán thành công!</p>
          <hr />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { transaction: state.transaction.data };
};

export default connect(mapStateToProps, null)(StepOne);
