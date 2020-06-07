import React, { useState, useEffect } from "react";
import { initTransactionRequest } from "./action";
import { connect } from "react-redux";
import CardProperty from "../CardProperty";

function InitTransaction(props) {
  const [price, setPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [seller] = useState(props.saleItem.owners);
  const [buyer, setBuyer] = useState([props.user.publicAddress]);
  const idProperty = props.match.params.hash;

  function formatCurrency(value) {
    const str = value.replace(/\./g, "");
    const offset = str.length % 3;
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (i > 0 && i % 3 === offset) {
        newStr += ".";
      }
      newStr += str[i];
    }
    return newStr;
  }
  useEffect(() => {
    if (props.idTransaction) {
      props.history.push(`/transaction/${props.idTransaction}`);
    }
  }, [props.idTransaction]);

  return (
    <div className="container mt-75">
      <h3>Khởi tạo giao dịch</h3>
      <h6>Tài sản</h6>
      <CardProperty />
      Mã tài sản: {idProperty}
      <h6>Bên bán</h6>
      <div>
        {seller.map((owner, index) => (
          <p key={index}>{owner}</p>
        ))}
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
        <div className="input-group">
          <input
            name="downPayment"
            component="input"
            type="text"
            className="form-control filter-input"
            placeholder="Số tiền đặt cọc"
            value={downPayment}
            onChange={(e) => {
              setDownPayment(formatCurrency(e.target.value));
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text"> VND </span>
          </div>
        </div>
      </div>
      <div className="form-group">
        <h6>Giá mua</h6>
        <div className="input-group">
          <input
            name="price"
            component="input"
            type="text"
            className="form-control filter-input"
            placeholder="Giá mua"
            value={price}
            onChange={(e) => {
              setPrice(formatCurrency(e.target.value));
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text"> VND </span>
          </div>
        </div>
      </div>
      <button
        className="btn v3"
        onClick={() => {
          if (confirm("Bạn chắc chắn muốn tạo giao dịch?"))
            props.initTransaction({
              seller,
              buyer,
              downPayment,
              price,
              idProperty,
            });
        }}
      >
        Tạo giao dịch
      </button>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const transactionHash = ownProps.match.params.hash;
  return {
    // saleItem: state.listingSale.find((item) => item.transactionHash == transactionHash),
    user: JSON.parse(localStorage.getItem("user")),
    saleItem: {
      createdAt: "2020-06-03T05:54:43.779Z",
      idInBlockchain: 4,
      owners: ["0x37F35c2024bDaf633e0bf6768f2087bCFd32C0D9"],
      _id: "5ed73b238c55940b04c54d40",
    },
    idTransaction: state.initTransaction.data && state.initTransaction.data._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initTransaction: (body) => {
      dispatch(initTransactionRequest(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitTransaction);
