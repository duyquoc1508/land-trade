import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import formatDate from "../../utils/formatDate";
import { convertWeiToVND } from "../../utils/convertCurrency";
import axios from "axios";
import Cookie from "../../helper/cookie";

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
    <div className="card" style={{ overflowY: "auto", maxHeight: "300px" }}>
      <div className="card-body">
        <h5>Tài sản giao dịch tại</h5>
        {/** get house address if exists || get land lot address */}
        <p>{address}</p>
        <h5>Bên bán</h5>
        <h3 style={{ color: "red" }}>Đã có data bên bán và bên mua</h3>
        <h5>Bên mua</h5>
        <h5>Giá trị đặt cọc</h5>
        <p>{convertWeiToVND(props.transaction.depositPrice)}</p>
        <h5>Giá trị giao dịch</h5>
        <p>{convertWeiToVND(props.transaction.transferPrice)}</p>
        <h5>Ngày bắt đầu giao dịch</h5>
        <p>{formatDate(props.transaction.timeStart)}</p>
        <h5>Ngày kết thúc giao dịch</h5>
        <p>{formatDate(props.transaction.timeEnd)}</p>
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
