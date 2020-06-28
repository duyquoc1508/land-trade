import React, { Component } from "react";

class ListProperties extends Component {
  render() {
    let { list } = this.props;
    return (
      <div className="viewd-item-wrap row">
        {list.map((property, index) => (
          <div className="col-xl-4 col-md-6 col-sm-12" key={index}>
            <div className="single-property-box">
              <div className="property-item">
                <a className="property-img" href="single-listing-two.html">
                  <img src="images/property/property_1.jpg" alt="#" />
                </a>
                <ul className="feature_text">
                  {/* <li className="feature_cb">
                    <span> Featured</span>
                  </li> */}
                  <li className="feature_or">
                    <span>
                      {" "}
                      {property.state == 0
                        ? "Chờ duyệt"
                        : property == 1
                        ? "Đã duyệt"
                        : "Đang bán"}{" "}
                    </span>
                  </li>
                </ul>
                <div className="property-author-wrap">
                  <a href="#" className="property-author">
                    <img src="images/agents/agent_min_1.jpg" alt="..." />
                    <span>Tony Stark</span>
                  </a>
                  <ul className="save-btn">
                    <li
                      data-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="Photos"
                    >
                      <a href=".html" className="btn-gallery">
                        <i className="lnr lnr-camera"></i>
                      </a>
                    </li>
                    <li
                      data-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="Bookmark"
                    >
                      <a href="#">
                        <i className="lnr lnr-heart"></i>
                      </a>
                    </li>
                    <li
                      data-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="Add to Compare"
                    >
                      <a href="#">
                        <i className="fas fa-arrows-alt-h"></i>
                      </a>
                    </li>
                  </ul>
                  <div className="hidden photo-gallery">
                    <a href="images/single-listing/property_view_1.jpg"></a>
                    <a href="images/single-listing/property_view_2.jpg"></a>
                    <a href="images/single-listing/property_view_3.jpg"></a>
                    <a href="images/single-listing/property_view_4.jpg"></a>
                    <a href="images/single-listing/property_view_5.jpg"></a>
                    <a href="images/single-listing/property_view_6.jpg"></a>
                    <a href="images/single-listing/property_view_7.jpg"></a>
                  </div>
                </div>
              </div>
              <div className="property-title-box">
                <h4>
                  <a href="single-listing-one.html">
                    {property.moreInfo.title}
                  </a>
                </h4>
                <div className="property-location">
                  <i className="fa fa-map-marker-alt"></i>
                  <p>{property.properties.landLot.address}</p>
                </div>
                <div className="trend-open mt-10">
                  <p> {property.moreInfo.price} VND </p>
                </div>
                <ul className="property-feature">
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
                    <span>
                      {property.moreInfo.areaFloor} m<super>2</super>
                    </span>
                  </li>
                  <li>
                    {" "}
                    <i className="fas fa-car"></i>
                    <span>{property.moreInfo.utilities.length} tiện ích</span>
                  </li>
                </ul>
                <div
                  className="trending-bottom"
                  style={{ padding: "15px 0px" }}
                >
                  <div className="trend-right float-right">
                    <div className="trend-open">
                      <button
                        className="btn v4 ml-2"
                        style={{
                          background: "#6449e7",
                          border: "1px solid transparent",
                        }}
                        onClick={() =>
                          history.push(`property/${property.transactionHash}`)
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
