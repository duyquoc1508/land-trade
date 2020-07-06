import React, { useState, useEffect } from "react";
import { initTransactionRequest, initTransactionSuccess } from "./action";
import { connect } from "react-redux";
import CardProperty from "../CardProperty";
import formatCurrency from "../../utils/formatCurrency";
import { convertVNDtoETH } from "../../utils/convertCurrency";
import axios from "axios";
import Cookie from "../../helper/cookie";

function InitTransaction(props) {
  const [depositPrice, setDepositPrice] = useState("");
  const [transferPrice, setTransferPrice] = useState("");
  const [buyer, setBuyer] = useState([props.user.publicAddress]);
  const [depositTime, setDepositTime] = useState(60);
  const [saleItem, setSaleItem] = useState(props.saleItem);

  useEffect(() => {
    // listen event TransactionCreated from blockchain and emit event INIT_TRANSACTION_SUCCESS
    props.transactionContract &&
      props.transactionContract.events
        .TransactionCreated()
        .on("data", (event) => {
          props.initTransactionSuccess({
            history: props.history,
            txHash: event.transactionHash,
          });
        })
        .on("error", console.error);
  }, [props.transactionContract]);

  const fetchPropertyTrading = async (transactionHash) => {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL_API}/certification/${transactionHash}`,
      headers: {
        Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
      },
    });
    return response.data.data;
  };

  useEffect(() => {
    if (!saleItem) {
      (async () => {
        const response = await fetchPropertyTrading(
          props.match.params.transactionHash
        );
        setSaleItem(response);
      })();
    }
  }, []);

  return (
    <div className="container mt-75">
      <h3>Khởi tạo giao dịch</h3>
      <h6>Tài sản</h6>
      <CardProperty />
      Mã tài sản: {saleItem && saleItem.transactionHash}
      <h6>Bên bán</h6>
      <div>
        {saleItem &&
          saleItem.owners &&
          saleItem.owners.map((owner, index) => <p key={index}>{owner}</p>)}
      </div>
      <h6>Bên mua</h6>
      <div>
        <div>
          {buyer.map((owner, index) => (
            <p key={index}>{owner}</p>
          ))}
        </div>
      </div>
      <div className="form-group">
        <h6>Số tiền đặt cọc</h6>
        <div className="row">
          <div className="input-group col-6">
            <input
              name="depositPrice"
              component="input"
              type="text"
              className="form-control filter-input"
              placeholder="Số tiền đặt cọc"
              value={depositPrice}
              onChange={(e) => {
                setDepositPrice(formatCurrency(e.target.value));
              }}
            />
            <div className="input-group-append">
              <span className="input-group-text"> VND </span>
            </div>
          </div>
          <div className="input-group col-6">
            <div>
              {" =>"} {convertVNDtoETH(depositPrice)}
              {" ETH"}
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <h6>Giá mua</h6>
        <div className="row">
          <div className="input-group col-6">
            <input
              name="price"
              component="input"
              type="text"
              className="form-control filter-input"
              placeholder="Giá mua"
              value={transferPrice}
              onChange={(e) => {
                setTransferPrice(formatCurrency(e.target.value));
              }}
            />
            <div className="input-group-append">
              <span className="input-group-text"> VND </span>
            </div>
          </div>
          <div className="input-group col-6">
            <div>
              {" =>"} {convertVNDtoETH(transferPrice)}
              {" ETH"}
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <h6>Thời gian đặt cọc</h6>
        <div className="input-group">
          <input
            name="price"
            component="input"
            type="text"
            className="form-control filter-input"
            placeholder="Giá mua"
            value={depositTime}
            onChange={(e) => {
              setDepositTime(e.target.value);
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text"> Ngày </span>
          </div>
        </div>
      </div>
      {/* notice */}
      <div style={{ color: "red", fontWeight: "bold" }}>
        Khi bạn xác nhận tạo giao dịch này, tài khoản của bạn sẽ bị trừ đi{" "}
        {convertVNDtoETH(depositPrice)}
        ETH. Bạn có thể hủy giao dịch và nhận lại tiền bất cứ khi nào người bán
        chưa chấp nhận giao dịch.
      </div>
      <button
        disabled={props.loading}
        className="btn v3"
        onClick={() => {
          if (confirm("Bạn chắc chắn muốn tạo giao dịch?"))
            props.initTransactionRequest({
              history: props.history,
              data: {
                buyer,
                idPropertyInBlockchain: saleItem.idInBlockchain,
                depositPrice: depositPrice,
                transferPrice: transferPrice,
                depositTime: depositTime,
              },
            });
        }}
      >
        Tạo giao dịch
      </button>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const transactionHash = ownProps.match.params.transactionHash;
  return {
    saleItem: state.listingSale.find(
      (item) => item.transactionHash == transactionHash
    ),
    user: JSON.parse(localStorage.getItem("user")),
    idTransaction: state.initTransaction.data && state.initTransaction.data._id,
    loading: state.initTransaction.loading,
    transactionContract: state.shared.transaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initTransactionRequest: (data) => {
      dispatch(initTransactionRequest(data));
    },
    initTransactionSuccess: (data) => {
      dispatch(initTransactionSuccess(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitTransaction);
