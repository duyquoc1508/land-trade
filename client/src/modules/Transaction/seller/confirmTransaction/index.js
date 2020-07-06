import React, { useState } from "react";
import { connect } from "react-redux";
import { confirmTransactionRequest } from "./actions";

const RenderModal = (props) => {
  const [display, setDisplay] = useState("inherit");
  return (
    <div className="modal" style={{ display: display }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Xác nhận giao dịch
            </h5>

            <button
              type="button"
              className="close"
              onClick={() => {
                // setDisplay("none");
                props.displayModal(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <h6>Thời gian đặt cọc</h6>
              <div className="input-group">
                <input
                  name="price"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  placeholder="Giá mua"
                />
                <div className="input-group-append">
                  <span className="input-group-text"> Ngày </span>
                </div>
              </div>
            </div>
            {/* notice */}
            <div style={{ color: "red", fontWeight: "bold" }}>
              Khi bạn xác nhận tạo giao dịch này, tài khoản của bạn sẽ bị trừ đi{" "}
              ETH. Bạn có thể hủy giao dịch và nhận lại tiền bất cứ khi nào
              người bán chưa chấp nhận giao dịch.
            </div>
            <button className="btn v4"></button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                // setDisplay("none");
                props.displayModal(false);
              }}
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setDisplay("none");
                props.confirmTransaction(false);
              }}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfirmTransaction = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [stateModal, setStateModal] = useState(false);
  // using pass data from child component to parent component
  const displayModal = (dataFromChild) => {
    setShowModal(dataFromChild);
  };

  const confirmTransactionRequest = () => {
    props.confirmTransactionRequest(props.transaction);
  };
  return (
    <div>
      <h1>Giao diện bên bán</h1>
      <p>Giao diện xác nhận nhận tiền và chuyển quyền sở hữu cho bên bán</p>
      <button
        className="btn v3 float-right mt-5 "
        onClick={() => props.confirmTransactionRequest(props.transaction)}
      >
        <i className="ion-android-cancel"></i> Xác nhận giao dịch
      </button>
      {/**  Button trigger modal */}
      <button className="btn v3" onClick={() => setShowModal(true)}>
        Xác nhận giao dịch popup
      </button>{" "}
      {showModal && (
        <RenderModal
          show={showModal}
          displayModal={displayModal}
          confirmTransaction={confirmTransactionRequest}
        />
      )}
    </div>
  );
};

// };

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmTransactionRequest: (idTransaction) => {
      dispatch(confirmTransactionRequest(idTransaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTransaction);
