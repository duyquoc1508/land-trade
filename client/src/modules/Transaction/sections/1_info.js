import React, { Component } from "react";

class TransactionInfo extends Component {
  render() {
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
                      <span className="amount">$3000.00</span>{" "}
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
                      <span className="amount">$210.00</span>{" "}
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
            <h5>Người tham gia</h5>
          </div>
          <div className="invoice-body">
            <div className="table-responsive">
              <table className="invoice-table">
                <tbody>
                  <tr className="bg-white">
                    <td>#1 </td>
                    <td>Trần Tấn Lộc </td>
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
                  <tr>
                    <td>#2 </td>
                    <td>Lê Thị Mỹ Hạnh</td>
                    <td>
                      <span className="amount">Người nhận sang nhượng</span>{" "}
                    </td>
                    <td>Đồng ý</td>
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
                    <td>#3 </td>
                    <td>Nguyễn Duy Quốc</td>
                    <td>
                      <span className="amount">Công chứng viên</span>{" "}
                    </td>
                    <td>Từ chối</td>
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
  }
}

export default TransactionInfo;
