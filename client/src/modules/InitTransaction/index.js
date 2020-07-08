import React, { useState, useEffect } from "react";
import { initTransactionRequest, initTransactionSuccess } from "./action";
import { connect } from "react-redux";
import formatCurrency from "../../utils/formatCurrency";
import { convertVNDtoETH } from "../../utils/convertCurrency";
import axios from "axios";
import Cookie from "../../helper/cookie";
import { Link } from "react-router-dom";
import Steps from "./steps";

function Init(props) {
  const [depositPrice, setDepositPrice] = useState("");
  const [transferPrice, setTransferPrice] = useState("");
  const [depositTime, setDepositTime] = useState(60);
  const [saleItem, setSaleItem] = useState(props.saleItem);
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);

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

  useEffect(() => {
    if (saleItem) {
      setTransferPrice(formatCurrency(saleItem.moreInfo.price));
      setDepositPrice(formatCurrency(saleItem.moreInfo.price * 0.3));
      (async () => {
        const [buyersInfo, sellersInfo] = await getParticipantsInfo(
          [props.user["publicAddress"]],
          saleItem.owners
        );
        setBuyers(buyersInfo);
        setSellers(sellersInfo);
      })();
    }
  }, [saleItem]);

  // get all user infor from publicAddress
  const getUserProfile = async (publicAddress) => {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL_API}/users/${publicAddress}`,
      headers: {
        Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
      },
    });
    return response.data.data;
  };

  const getParticipantsInfo = async (buyers, sellers) => {
    const promises1 = buyers.map((publicAddress) =>
      getUserProfile(publicAddress)
    );
    const promises2 = sellers.map((publicAddress) =>
      getUserProfile(publicAddress)
    );
    return Promise.all([Promise.all(promises1), Promise.all(promises2)]);
  };

  return !saleItem ? (
    ""
  ) : (
    <div className="container mt-75">
      <div className="row">
        <div className="col-md-4">
          <Steps />
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h6>Tài sản</h6>
              <div className="single-property-box">
                {/* <div className="property-item">
                  <Link
                    className="property-img"
                    to={`property/${saleItem.transactionHash}`}
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${saleItem.images[0]}`}
                      alt="#"
                    />
                  </Link>
                </div> */}
                <div className="property-title-box">
                  <h4>
                    <Link to={`property/${saleItem.transactionHash}`}>
                      {saleItem.moreInfo.title}
                    </Link>
                  </h4>
                  <div className="property-location">
                    <i className="fa fa-map-marker-alt"></i>
                    <p>{saleItem.properties.landLot.address}</p>
                  </div>
                  <div className="trend-open mt-10">
                    <p> {formatCurrency(saleItem.moreInfo.price)} </p>
                  </div>
                  <ul className="property-feature">
                    <li>
                      {" "}
                      <i className="fas fa-bed"></i>
                      <span>{saleItem.moreInfo.numOfBedrooms} phòng ngủ</span>
                    </li>
                    <li>
                      {" "}
                      <i className="fas fa-bath"></i>
                      <span>
                        {saleItem.moreInfo.numOfBathrooms} phòng vệ sinh
                      </span>
                    </li>
                    <li>
                      {" "}
                      <i className="fas fa-arrows-alt"></i>
                      <span>{saleItem.moreInfo.areaFloor} m2</span>
                    </li>
                    <li>
                      {" "}
                      <i className="fas fa-car"></i>
                      <span>{saleItem.moreInfo.utilities.length} tiện ích</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <h6>Số tiền đặt cọc</h6>
                <div className="row">
                  <div className="input-group">
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
                </div>
                <p>
                  {convertVNDtoETH(depositPrice)}
                  {" ETH"}
                </p>
              </div>
              <div className="form-group">
                <h6>Giá mua</h6>
                <div className="row">
                  <div className="input-group">
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
                </div>
                <p>
                  {convertVNDtoETH(transferPrice)}
                  {" ETH"}
                </p>
              </div>
              <div className="form-group">
                <h6>Thời gian đặt cọc</h6>
                <div className="row">
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
              </div>
            </div>
          </div>
          <h6>Bên bán</h6>
          <div>
            {sellers.map((owner, index) => (
              <div className="agent-details" key={index}>
                <ul className="address-list">
                  <li>
                    <span>Họ tên :</span>
                    {owner.fullName}
                  </li>
                  <li>
                    <span>Email:</span>
                    {owner.email}
                  </li>
                  <li>
                    <span>SDT:</span>
                    {owner.phoneNumber}
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <br />
          <h6>Bên mua</h6>
          <div>
            <div className="agent-details">
              <ul className="address-list">
                <li>
                  <span>Họ tên :</span>
                  {props.user.fullName}
                </li>
                <li>
                  <span>Email:</span>
                  {props.user.email}
                </li>
                <li>
                  <span>SDT:</span>
                  {props.user.phoneNumber}
                </li>
              </ul>
            </div>
          </div>
          {/* notice */}
          <div style={{ color: "red", fontWeight: "bold" }}>
            Khi bạn xác nhận tạo giao dịch này, tài khoản của bạn sẽ bị trừ đi{" "}
            {convertVNDtoETH(depositPrice)}
            ETH. Bạn có thể hủy giao dịch và nhận lại tiền bất cứ khi nào người
            bán chưa chấp nhận giao dịch.
          </div>
          <button
            disabled={props.loading}
            className="btn v3"
            onClick={() => {
              if (confirm("Bạn chắc chắn muốn tạo giao dịch?"))
                props.initTransactionRequest({
                  history: props.history,
                  data: {
                    buyer: buyers.map((item) => item.publicAddress),
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
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Init);
