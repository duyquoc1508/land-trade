import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListProperties extends Component {
  render() {
    let { list, history } = this.props;
    return list.length === 0 ? (
      <h3 className="post-title text-center">Bạn chưa có tài sản nào</h3>
    ) : (
      <div className="viewd-item-wrap row">
        {list.map((property, index) => (
          <div className="col-xl-4 col-md-6 col-sm-12" key={index}>
            <div className="single-property-box">
              <div className="property-item">
                <Link
                  className="property-img"
                  to={`property-standard/${property.transactionHash}`}
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${property.images[0]}`}
                    alt="#"
                  />
                </Link>
                <ul className="feature_text">
                  {/* <li className="feature_cb">
                    <span> Featured</span>
                  </li> */}
                  <li className="feature_or">
                    <span>
                      {" "}
                      {property.state == 0
                        ? "Chờ duyệt"
                        : property.state == 1
                        ? "Đã duyệt"
                        : "Đang bán"}{" "}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="property-title-box">
                {/* <h4>
                  <Link to={`property-standard/${property.transactionHash}`}>
                    {property.moreInfo.title}
                  </Link>
                </h4> */}
                <div className="property-location">
                  <i className="fa fa-map-marker-alt"></i>
                  <p>{property.properties.landLot.address}</p>
                </div>
                {/* <div className="trend-open mt-10">
                  <p> {formatCurrency(property.moreInfo.price)} VND </p>
                </div> */}
                {/* <ul className="property-feature">
                  <li>
                    {" "}
                    <i className="fas fa-bed"></i>
                    <span>{property.moreInfo.numOfBedrooms} phòng ngủ</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fas fa-bath"></i>
                    <span> {property.moreInfo.numOfBathrooms} phòng tắm</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fas fa-arrows-alt"></i>
                    <span>{property.moreInfo.areaFloor} m2</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fas fa-car"></i>
                    <span>{property.moreInfo.utilities.length} tiện ích</span>
                  </li>
                </ul> */}
                <div
                  className="trending-bottom"
                  style={{ padding: "15px 0px" }}
                >
                  <div className="trend-right float-right">
                    <div className="trend-open">
                      <button
                        className="btn v4 ml-2 text-light"
                        style={{
                          background: "#6449e7",
                          border: "1px solid transparent",
                        }}
                        onClick={() =>
                          history.push(
                            `property-standard/${property.transactionHash}`
                          )
                        }
                      >
                        <i className="ion-edit"></i> Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListProperties;
