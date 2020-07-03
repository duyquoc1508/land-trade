import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Cookie from "../../../helper/cookie";
import formatDate from "../../../utils/formatDate";

const TransactionInfo = (props) => {
  // const [propetySale, setPropertySale] = useState("");
  // console.log("TransactionInfo -> propetySale", propetySale);
  // const [count, setCount] = useState(0);
  // Fetch infor property
  // const fetchProperty = async (idProperty) => {
  //   const response = await axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_BASE_URL_API}/certification/${idProperty}}`,
  //     headers: {
  //       Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
  //     },
  //   });
  //   return response.data.data;
  // };
  // useEffect(() => {
  //   if (props.idProperty) {
  //     async () => {
  //       const propety = await fetchProperty(props.idProperty);
  //       setPropertySale(propety);
  //     };
  //   }
  // }, [props.idProperty]);
  return (
    <div className="container col-md-12">
      <div className="act-title">
        <h5>Thông tin tài sản</h5>
      </div>
      <div className="viewd-item-wrap">
        <div className="most-viewed-item">
          <div className="most-viewed-img">
            <a href="#">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/images/property/property_1.jpg`}
                alt="..."
              />
            </a>
            <ul className="feature_text">
              <li className="feature_or">
                <span>For Sale</span>
              </li>
            </ul>
          </div>
          <div className="most-viewed-detail">
            <h3>
              <a href="single-listing-one.html">Villa on Hartford</a>
            </h3>
            <p className="list-address">
              <i className="fas fa-map-marker-alt"></i>2854 Meadow View Drive,
              Hartford, USA
            </p>
            <div className="trend-open">
              <p>
                <span className="per_sale">starts from</span>$25000
              </p>
            </div>
            <div className="ratings">
              <i className="ion-ios-star"></i>
              <i className="ion-ios-star"></i>
              <i className="ion-ios-star"></i>
              <i className="ion-ios-star"></i>
              <i className="ion-ios-star-half"></i>
            </div>
            <div className="views">
              Views : <span>178</span>
            </div>
          </div>
        </div>
      </div>

      <div className="invoice-panel">
        <div className="act-title">
          <h5>Người tham gia</h5>
        </div>
        <div className="invoice-body">
          <div className="table-responsive">
            <h5>Bên bán</h5>
            <table className="invoice-table">
              <tbody>
                {props.transaction.sellers.map((publicAddress, index) => (
                  <tr className="bg-white" key={index}>
                    <td>#{index + 1} </td>
                    <td>{publicAddress} </td>
                    <td>
                      <span className="">Người sang nhượng</span>{" "}
                    </td>
                    <td>Đồng ý </td>
                    <td>
                      <a
                        href="db-single-invoice.html"
                        className="invoice-action"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="View Invoice"
                      >
                        {" "}
                        <i className="ion-ios-eye-outline"></i>
                      </a>
                      <a
                        href="#"
                        className="invoice-action"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Delete"
                      >
                        {" "}
                        <i className="ion-android-delete"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h5>Bên mua</h5>
            <table className="invoice-table">
              <tbody>
                {props.transaction.buyers.map((publicAddress, index) => (
                  <tr className="bg-white" key={index}>
                    <td>#{index + 1} </td>
                    <td>{publicAddress}</td>
                    <td>
                      <span className="">Người nhận sang nhượng</span>{" "}
                    </td>
                    <td>Đồng ý </td>
                    <td>
                      <a
                        href="db-single-invoice.html"
                        className="invoice-action"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="View Invoice"
                      >
                        {" "}
                        <i className="ion-ios-eye-outline"></i>
                      </a>
                      <a
                        href="#"
                        className="invoice-action"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Delete"
                      >
                        {" "}
                        <i className="ion-android-delete"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="invoice-panel">
        <div className="act-title">
          <h5>Giá trị giao dịch</h5>
        </div>
        <div className="invoice-body">
          <div className="table-responsive">
            <table className="invoice-table">
              <tbody>
                <tr className="bg-white">
                  <td>#1 </td>
                  <td>Tiền đặt cọc </td>
                  <td>
                    <time>Mar 21,2019</time>
                  </td>
                  <td>
                    <span className="amount">
                      {props.transaction.depositPrice}
                    </span>
                    {" VND"}
                  </td>
                  <td>
                    <a
                      href="db-single-invoice.html"
                      className="invoice-action"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="View Invoice"
                    >
                      {" "}
                      <i className="ion-ios-eye-outline"></i>
                    </a>
                    <a
                      href="#"
                      className="invoice-action"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Delete"
                    >
                      {" "}
                      <i className="ion-android-delete"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>#2 </td>
                  <td>Tiền thanh toán</td>
                  <td>
                    <time>Mar 9, 2019</time>
                  </td>
                  <td>
                    <span className="amount">
                      {props.transaction.transferPrice}
                    </span>
                    {" VND"}
                  </td>
                  <td>
                    <a
                      href="db-single-invoice.html"
                      className="invoice-action"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="View Invoice"
                    >
                      {" "}
                      <i className="ion-ios-eye-outline"></i>
                    </a>
                    <a
                      href="#"
                      className="invoice-action"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Delete"
                    >
                      {" "}
                      <i className="ion-android-delete"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="invoice-panel">
        <div className="act-title">
          <h5>Thời gian giao dich</h5>
        </div>
        <div className="invoice-body">
          <div className="table-responsive">
            <table className="invoice-table">
              <tbody>
                <tr className="bg-white">
                  <td>#1 </td>
                  <td>Ngày bắt đầu </td>
                  <td>
                    <time>Mar 21,2019</time>
                  </td>
                  <td>
                    <span className="amount">
                      {formatDate(props.transaction.timeStart)}
                    </span>
                  </td>
                  <td>
                    <a
                      href="db-single-invoice.html"
                      className="invoice-action"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="View Invoice"
                    >
                      {" "}
                      <i className="ion-ios-eye-outline"></i>
                    </a>
                    <a
                      href="#"
                      className="invoice-action"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Delete"
                    >
                      {" "}
                      <i className="ion-android-delete"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>#2 </td>
                  <td>Ngày kết thúc</td>
                  <td>
                    <time>Mar 9, 2019</time>
                  </td>
                  <td>
                    <span className="amount">
                      {formatDate(props.transaction.timeEnd)}
                    </span>
                  </td>
                  <td>
                    <a
                      href="db-single-invoice.html"
                      className="invoice-action"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="View Invoice"
                    >
                      {" "}
                      <i className="ion-ios-eye-outline"></i>
                    </a>
                    <a
                      href="#"
                      className="invoice-action"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Delete"
                    >
                      {" "}
                      <i className="ion-android-delete"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    property: state.transaction.property,
    transaction: state.transaction.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionInfo);
