import React from "react";
import { connect } from "react-redux";
import { convertWeiToVND } from "../../../../utils/convertCurrency";
import formatCurrency from "../../../../utils/formatCurrency";
import formatDate from "../../../../utils/formatDate";

const Payment = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details text-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/pending-payment.png`}
            width="150"
            className="my-50"
          />
          <h5 className="mb-5">Bạn đã chấp nhận giao dịch</h5>
          {props.transaction.state == "DEPOSIT_CONFIRMED" && (
            <p> Vui lòng chờ người mua thanh toán số tiền còn lại!</p>
          )}
          <hr />

          <h5 className="mb-5">Chi tiết thanh toán</h5>
          <div className="col-6 offset-sm-3">
            <ul className="address-list">
              <li>
                <span>Ngày nhận tiền đặt cọc:</span>
                {formatDate(props.transaction.depositConfirmed.time)}
              </li>
              <li>
                <span>Sô tiền đã nhận đặt cọc:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.depositPrice)
                )}
                VND
              </li>
              <li>
                <span>Sô tiền còn lại:</span>
                {formatCurrency(
                  convertWeiToVND(
                    props.transaction.transferPrice -
                      props.transaction.depositPrice
                  )
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

export default connect(mapStateToProps, null)(Payment);
