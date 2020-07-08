import React from "react";
import { connect } from "react-redux";
import { convertWeiToVND } from "../../../../utils/convertCurrency";
import formatCurrency from "../../../../utils/formatCurrency";
import formatDate from "../../../../utils/formatDate";

const ConfirmTransaction = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details text-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/payment.png`}
            width="150"
            className="my-50"
          />
          <h5 className="mb-5">Bạn đã thanh toán thành công</h5>
          {props.transaction.state == "PAYMENT_REQUEST" && (
            <p> Vui lòng chờ người bán xác nhận thanh toán!</p>
          )}
          <hr />

          <h5 className="mb-5">Chi tiết thanh toán</h5>
          <div className="col-6 offset-sm-3">
            <ul className="address-list">
              <li>
                <span>Số tiền đã đặt cọc:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.depositPrice)
                )}
                VND
              </li>
              <li>
                <span>Sô tiền thanh toán:</span>
                {formatCurrency(
                  convertWeiToVND(
                    props.transaction.transferPrice -
                      props.transaction.depositPrice
                  )
                )}
                VND
              </li>
              <li>
                <span>Thuế thu nhập cá nhân:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.transferPrice * 0.005)
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

export default connect(mapStateToProps, null)(ConfirmTransaction);
