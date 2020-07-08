import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import formatDate from "../../utils/formatDate";
import { convertWeiToVND } from "../../utils/convertCurrency";
import axios from "axios";
import Cookie from "../../helper/cookie";
import formatCurrency from "../../utils/formatCurrency";

function TransactionInfo(props) {
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const address =
    (props.property.properties &&
      props.property.properties.house &&
      props.property.properties.house.address) ||
    (props.property.properties &&
      props.property.properties.landLot &&
      props.property.properties.landLot.address);
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

  // get participants information
  useEffect(() => {
    // check if exists props.transaction => then fetch
    props.transaction &&
      (async () => {
        const [buyersInfo, sellersInfo] = await getParticipantsInfo(
          props.transaction.buyers,
          props.transaction.sellers
        );
        setBuyers(buyersInfo);
        setSellers(sellersInfo);
      })();
  }, [props.transaction]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="agent-details col-6">
            <h5>Tài sản giao dịch</h5>
            <ul className="address-list">
              <li>
                <span>Xem chi tiết tài sản:</span>
                <a
                  target="_blank"
                  href={`${process.env.REACT_APP_BASE_URL}/property-standard/${props.property.transactionHash}`}
                >
                  {props.property && props.property.moreInfo.title}
                </a>
              </li>
              <li>
                <span>Địa điểm:</span>
                {address}
              </li>
              <li>
                <span>Giá trị đặt cọc:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.depositPrice)
                )}{" "}
                VNĐ
              </li>
              <li>
                <span>Giá trị giao dịch:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.transferPrice)
                )}{" "}
                VNĐ
              </li>
            </ul>
          </div>
          <div className="agent-details col-6">
            <h5>Thời gian giao dịch</h5>
            <ul className="address-list">
              <li>
                <span>Ngày bắt đầu:</span>
                {formatDate(props.transaction.timeStart)}
              </li>
              <li>
                <span>Ngày kết thúc:</span>
                {formatDate(props.transaction.timeEnd)}
              </li>
            </ul>
          </div>

          <hr />
          <div className="agent-details col-6">
            <h5>Bên chuyển nhượng</h5>
            {sellers.map((item, index) => (
              <ul className="address-list" key={index}>
                <li>
                  <span>Họ tên:</span>
                  {item.fullName}
                </li>
                <li>
                  <span>Số CMND:</span>
                  {item.idNumber}
                </li>
                <li>
                  <span>Email:</span>
                  {item.email}
                </li>
              </ul>
            ))}
          </div>
          <div className="agent-details col-6">
            <h5>Bên nhận chuyển nhượng</h5>
            {buyers.map((item, index) => (
              <ul className="address-list" key={index}>
                <li>
                  <span>Họ tên:</span>
                  {item.fullName}
                </li>
                <li>
                  <span>Số CMND:</span>
                  {item.idNumber}
                </li>
                <li>
                  <span>Email:</span>
                  {item.email}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
    property: state.transaction.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionInfo);
