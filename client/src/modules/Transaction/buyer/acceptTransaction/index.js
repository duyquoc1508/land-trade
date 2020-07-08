import React from "react";
import { connect } from "react-redux";
import { convertWeiToVND } from "../../../../utils/convertCurrency";
import formatCurrency from "../../../../utils/formatCurrency";
import formatDate from "../../../../utils/formatDate";

const AcceptTransaction = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details text-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/check.png`}
            width="100"
            className="my-50"
          />
          <h5 className="mb-5">Bạn đã đặt cọc thành công</h5>
          {props.transaction.state == "DEPOSIT_REQUEST" && (
            <p> Vui lòng chờ người bán chấp nhận giao dịch!</p>
          )}
          <hr />

          <h5 className="mb-5">Chi tiết đặt cọc</h5>
          <div className="col-6 offset-sm-3">
            <ul className="address-list">
              <li>
                <span>Ngày đặt cọc:</span>
                {formatDate(props.transaction.createdAt)}
              </li>
              <li>
                <span>Sô tiền đã đặt cọc:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.depositPrice)
                )}
                VND
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { transaction: state.transaction.data };
};

export default connect(mapStateToProps, null)(AcceptTransaction);
