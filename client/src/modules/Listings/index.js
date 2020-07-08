import React, { Component } from "react";
import { loadScript } from "../../helper/utils";
import { connect } from "react-redux";
import Filter from "./sections/filter";
import { requestFetch } from "./actions";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

class Listings extends Component {
  componentDidMount() {
    loadScript("js/plugin.js");
    loadScript("js/main.js");
    this.props.handleClick();
  }

  renderItem() {
    return this.props.listingSale.map(
      (item, index) =>
        !item.owners.includes(this.props.user.publicAddress) && (
          <div className="col-xl-4 col-md-6 col-sm-12" key={index}>
            <div className="single-property-box">
              <div className="property-item">
                <Link
                  className="property-img"
                  to={`property/${item.transactionHash}`}
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${item.images[0]}`}
                    alt="#"
                  />
                </Link>
                {/* <ul className="feature_text">
            <li className="feature_cb">
              <span> Featured</span>
            </li>
            <li className="feature_or">
              <span>For Sale</span>
            </li>
          </ul> */}
                {/* <div className="property-author-wrap">
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
          </div> */}
              </div>
              <div className="property-title-box">
                <h4>
                  <Link to={`property/${item.transactionHash}`}>
                    {item.moreInfo.title}
                  </Link>
                </h4>
                <div className="property-location">
                  <i className="fa fa-map-marker-alt"></i>
                  <p>{item.properties.landLot.address}</p>
                </div>
                <div className="trend-open mt-10">
                  <p> {formatCurrency(item.moreInfo.price)} VND</p>
                </div>
                <ul className="property-feature">
                  <li>
                    {" "}
                    <i className="fas fa-bed"></i>
                    <span>{item.moreInfo.numOfBedrooms} phòng ngủ</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fas fa-bath"></i>
                    <span>{item.moreInfo.numOfBathrooms} phòng vệ sinh</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fas fa-arrows-alt"></i>
                    <span>{item.moreInfo.areaFloor} m2</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fas fa-car"></i>
                    <span>{item.moreInfo.utilities.length} tiện ích</span>
                  </li>
                </ul>
                <div
                  className="trending-bottom"
                  style={{ padding: "15px 0px" }}
                >
                  <div className="trend-right float-right">
                    <div className="trend-open">
                      <button
                        class="btn v4 ml-2"
                        style={{
                          background: "#6449e7",
                          border: "1px solid transparent",
                        }}
                        onClick={() =>
                          this.props.history.push(
                            `property/${item.transactionHash}`
                          )
                        }
                      >
                        <i class="ion-android-add-circle"></i> Xem chi tiết
                      </button>
                      <button
                        class="btn v4 ml-2"
                        style={{
                          background: "#6449e7",
                          border: "1px solid transparent",
                        }}
                        onClick={() =>
                          this.props.history.push(
                            `create-transaction/${item.transactionHash}`
                          )
                        }
                      >
                        <i class="ion-android-add-circle"></i> Mua
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    );
  }

  render() {
    return (
      <div>
        <div className="filter-wrapper section-padding">
          <div className="container">
            <div className="row">
              {/* <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <Filter />
                  </div>
                </div>
              </div> */}
              <div className="col-md-12">
                {/* <div className="row pt-60   align-items-center">
                  <div className="col-lg-4 col-sm-7 col-7">
                    <div className="nice-select hero__form-input custom-select filter-sorting">
                      <span className="current">Sort by Newest</span>
                      <ul className="list">
                        <li className="option focus">Sort by Newest</li>
                        <li className="option focus">Sort by Oldest</li>
                        <li className="option focus">Sort by Featured</li>
                        <li className="option focus">
                          Sort by Price(Low to High)
                        </li>
                        <li className="option focus">
                          Sort by Price(Low to High)
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="item-element res-box  text-right sm-left">
                      <p>
                        Showing <span>1-15 of 69</span> Listings
                      </p>
                    </div>
                  </div>
                </div> */}
                <div className="item-wrapper pt-40   ">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane  show active fade property-list fullwidth"
                      id="list-view"
                    >
                      {this.renderItem()}
                    </div>
                    {/* <div className="post-nav nav-res pt-50  ">
                      <div className="row">
                        <div className="col-md-8 offset-md-2  col-xs-12 ">
                          <div className="page-num text-center">
                            <ul>
                              <li className="active">
                                <a href="#">1</a>
                              </li>
                              <li>
                                <a href="#">2</a>
                              </li>
                              <li>
                                <a href="#">3</a>
                              </li>
                              <li>
                                <a href="#">4</a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="lnr lnr-chevron-right"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listingSale: state.listingSale,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(requestFetch());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
