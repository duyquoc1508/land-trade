import React from "react";
import { connect } from "react-redux";
import formatDate from "../../utils/formatDate";

const Canceled = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details text-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/canceled.png`}
            width="150"
            className="my-50"
          />
          <h5 className="mb-5">Giao dịch đã hủy</h5>
          <div className="col-6 offset-sm-3">
            <ul className="address-list">
              <li>
                <span>Ngày hủy giao dịch:</span>
                {formatDate(props.transaction.updatedAt)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
  };
};

export default connect(mapStateToProps, null)(Canceled);
