import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import formatDate from "../../utils/formatDate";
import { convertWeiToVND } from "../../utils/convertCurrency";
import axios from "axios";
import formatCurrency from "../../utils/formatCurrency";

function TransactionDetail(props) {
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [property, setProperty] = useState({});

  // get all user infor from publicAddress
  const getUserProfile = async (publicAddress) => {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL_API}/users/${publicAddress}`,
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
    (async () => {
      const responseT = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL_API}/transaction/${props.match.params.txHash}`,
      });
      let transaction = responseT.data.data;
      const responseP = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL_API}/certification/id-in-blockchain/${transaction.idPropertyInBlockchain}`,
      });
      let property = responseP.data.data;
      const [buyersInfo, sellersInfo] = await getParticipantsInfo(
        transaction.buyers,
        transaction.sellers
      );
      setTransaction(transaction);
      setProperty(property);
      setBuyers(buyersInfo);
      setSellers(sellersInfo);
    })();
  }, []);

  let renderTimeline = (transaction) => {
    let cycleTransaction = [
      "DEPOSIT_REQUEST",
      "DEPOSIT_CANCELED_BY_BUYER",
      "DEPOSIT_CANCELED_BY_SELLER",
      "DEPOSIT_CONFIRMED",
      "DEPOSIT_BROKEN_BY_SELLER",
      "DEPOSIT_BROKEN_BY_BUYER",
      "PAYMENT_REQUEST",
      "DEPOSIT_BROKEN_BY_BUYER",
      "TRANSFER_CANCELED_BY_SELLER",
      "PAYMENT_CONFIRMED",
    ];

    const data = {
      DEPOSIT_REQUEST: {
        // title: `${buyers[0] && buyers[0].fullName} đặt cọc`,
        title: `Yêu cầu đặt cọc`,
        time: formatDate(transaction.createdAt),
        description: `${
          buyers[0] && buyers[0].fullName
        } gửi yêu cầu đặt cọc tới ${
          sellers[0] && sellers[0].fullName
        } giá trị ${formatCurrency(
          convertWeiToVND(transaction.depositPrice)
        )} VNĐ`,
        explorer: transaction.transactionHash,
      },

      DEPOSIT_CANCELED_BY_BUYER: {
        // title: `${buyers[0] && buyers[0].fullName} hủy đặt cọc`,
        title: `Giao dịch thất bại`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          buyers[0] && buyers[0].fullName
        } hủy yêu cầu đặt cọc và nhận lại tiền đặt cọc`,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,
      },

      DEPOSIT_CANCELED_BY_SELLER: {
        // title: `${sellers[0] && sellers[0].fullName} từ chối giao dịch`,
        title: `Giao dịch thất bại`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          sellers[0] && sellers[0].fullName
        } từ chối giao dịch và ${
          buyers[0] && buyers[0].fullName
        } nhận lại ${formatCurrency(
          convertWeiToVND(transaction.depositPrice)
        )} VNĐ tiền đặt cọc `,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,
      },

      DEPOSIT_CONFIRMED: {
        // title: `${
        //   sellers[0] && sellers[0].fullName
        // } chấp nhận giao dịch và nhận đặt cọc`,
        title: `Chấp nhận giao dịch`,
        time:
          transaction.depositConfirmed &&
          formatDate(transaction.depositConfirmed.time),
        description: `${
          sellers[0] && sellers[0].fullName
        } chấp nhận giao dịch với ${
          buyers[0] && buyers[0].fullName
        } và nhận ${formatCurrency(
          convertWeiToVND(transaction.depositPrice)
        )} VNĐ tiền đặt cọc`,
        explorer:
          transaction.depositConfirmed && transaction.depositConfirmed.txHash,
      },

      DEPOSIT_BROKEN_BY_SELLER: {
        // title: `${sellers[0] && sellers[0].fullName} hủy giao dịch`,
        title: `Giao dịch thất bại`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          sellers[0] && sellers[0].fullName
        } hủy giao dịch và đền bù hợp đồng cho ${
          buyers[0] && buyers[0].fullName
        } giá trị ${formatCurrency(
          convertWeiToVND(transaction.depositPrice * 2)
        )} VNĐ`,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,
      },

      DEPOSIT_BROKEN_BY_BUYER: {
        // title: `${buyers[0] && buyers[0].fullName} hủy giao dịch`,
        title: `Giao dịch thất bại`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          buyers[0] && buyers[0].fullName
        } hủy giao dịch và mất tiền đặt cọc`,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,
      },

      PAYMENT_REQUEST: {
        // title: `${buyers[0] && buyers[0].fullName} thanh toán số tiền còn lại`,
        title: `Thanh toán`,
        time: transaction.payment && formatDate(transaction.payment.time),
        description: `${
          buyers[0] && buyers[0].fullName
        } thanh toán số tiền còn lại: ${formatCurrency(
          convertWeiToVND(transaction.transferPrice - transaction.depositPrice)
        )}VNĐ cho ${
          sellers[0] && sellers[0].fullName
        } và + thuế ${formatCurrency(
          convertWeiToVND(transaction.transferPrice * 0.005)
        )}VNĐ cho nhà nước`,
        explorer: transaction.payment && transaction.payment.txHash,
      },

      TRANSFER_CANCELED_BY_BUYER: {
        // title: `${buyers[0] && buyers[0].fullName} hủy giao dịch`,
        title: `Giao dịch thất bại`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          buyers[0] && buyers[0].fullName
        } hủy giao dịch nhận lại số tiền thanh toán còn lại ${formatCurrency(
          convertWeiToVND(transaction.transferPrice - transaction.depositPrice)
        )} VNĐ + thuế ${formatCurrency(
          convertWeiToVND(transaction.transferPrice * 0.005)
        )} VNĐ và mất tiền đặt cọc`,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,

        explorer: transaction.payment && transaction.payment.txHash,
      },
      TRANSFER_CANCELED_BY_SELLER: {
        // title: `${sellers[0] && sellers[0].fullName} hủy giao dịch`,
        title: `Giao dịch thất bại`,
        time:
          transaction.transactionCanceled &&
          formatDate(transaction.transactionCanceled.time),
        description: `${
          sellers[0] && sellers[0].fullName
        } hủy giao dịch và đền bù hợp đồng ${formatCurrency(
          convertWeiToVND(transaction.depositPrice * 2)
        )}VNĐ cho ${buyers[0] && buyers[0].fullName}.  ${
          buyers[0] && buyers[0].fullName
        } nhân lại số tiền đã thanh toán và tiền đền bù hợp đồng.`,
        explorer:
          transaction.transactionCanceled &&
          transaction.transactionCanceled.txHash,
      },
      PAYMENT_CONFIRMED: {
        // title: `${sellers[0] && sellers[0].fullName} chấp nhận thanh toán`,
        title: `Xác nhận giao dịch`,
        time:
          transaction.paymentConfirmed &&
          formatDate(transaction.paymentConfirmed.time),
        description: `${
          sellers[0] && sellers[0].fullName
        } nhận số tiền còn lại: ${formatCurrency(
          convertWeiToVND(transaction.transferPrice - transaction.depositPrice)
        )}VNĐ - thuế ${formatCurrency(
          convertWeiToVND(transaction.transferPrice * 0.002)
        )}VNĐ. ${buyers[0] && buyers[0].fullName} nhận quyền sỡ hữu tài sản`,
        explorer:
          transaction.paymentConfirmed && transaction.paymentConfirmed.txHash,
      },
    };

    return cycleTransaction.map((item, index) => {
      let pos = 0;
      if (transaction.state == "CANCELED") {
        pos = cycleTransaction.findIndex(
          (item) => item == transaction.transactionCanceled.reason
        );
      } else {
        pos = cycleTransaction.findIndex((item) => item == transaction.state);
      }
      if (
        index < pos &&
        (item.includes("BROKEN") || item.includes("CANCELED"))
      ) {
        return "";
      }
      if (index > pos) {
        return "";
      }
      return (
        <div class="row" key={index}>
          <div class="col-auto text-center flex-column d-none d-sm-flex">
            <div class="row h-50">
              <div class="col border-right">&nbsp;</div>
              <div class="col">&nbsp;</div>
            </div>
            <h5 class="m-2">
              <span class="badge badge-pill bg-success border">&nbsp;</span>
            </h5>
            <div class="row h-50">
              <div class="col border-right">&nbsp;</div>
              <div class="col">&nbsp;</div>
            </div>
          </div>
          <div class="col py-2">
            <div class="card border-success shadow">
              <div class="card-body">
                <div class="float-right text-success">{data[item].time}</div>
                <h4 class="card-title text-success">{data[item].title}</h4>
                <p class="card-text">{data[item].description}</p>
                <a
                  target="_blank"
                  href={`${process.env.REACT_APP_EXPLORER}/${data[item].explorer}`}
                >
                  Kiểm tra giao dịch trên Blockchain
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container mt-100">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="agent-details col-6">
              <h5>Tài sản giao dịch</h5>
              <ul className="address-list">
                <li>
                  <span>Địa điểm:</span>
                  {property &&
                    property.properties &&
                    property.properties.landLot.address}
                </li>
                <li>
                  <span>Giá trị đặt cọc:</span>
                  {formatCurrency(
                    convertWeiToVND(transaction.depositPrice)
                  )}{" "}
                  VNĐ
                </li>
                <li>
                  <span>Giá trị giao dịch:</span>
                  {formatCurrency(
                    convertWeiToVND(transaction.transferPrice)
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
                  {formatDate(transaction.timeStart)}
                </li>
                <li>
                  <span>Ngày kết thúc:</span>
                  {formatDate(transaction.timeEnd)}
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

      <div class="container py-2">
        <h3 class="font-weight-light text-center text-muted py-3">
          Lịch sử giao dịch
        </h3>
        {renderTimeline(transaction)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);
