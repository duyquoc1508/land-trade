import React from "react";
import { connect } from "react-redux";
import { acceptTransactionRequest } from "./action";

const AcceptTransaction = (props) => {
  return (
    <div>
      <h1>Giao diện bên bán</h1>
      <p>
        Giao diện chấp nhận giao dịch bên bán kí hợp đồng đặt cọc và nhận tiền
      </p>
      <button
        className="btn v3 float-right mt-5 "
        onClick={() =>
          props.acceptTransactionRequest(props.transaction.idInBlockchain)
        }
      >
        <i className="ion-android-cancel"></i> Chấp nhận giao dịch
      </button>

      {/**  Button trigger modal */}
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/** modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    acceptTransactionRequest: (idTransaction) => {
      dispatch(acceptTransactionRequest(idTransaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptTransaction);
