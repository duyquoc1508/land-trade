import React, { Component } from "react";
import { loadScript } from "../../helper/utils";
import { connect } from "react-redux";
import Filter from "./sections/filter";
import { requestFetch } from "./actions";

class Listings extends Component {
  componentDidMount() {
    loadScript("js/plugin.js");
    console.log("load main");
    loadScript("js/main.js");
    this.props.handleClick();
  }

  renderItem() {
    return this.props.listingSale.map((item, index) => (
      <div className="col-xl-4 col-md-6 col-sm-12" key={index}>
        <div className="single-property-box">
          <div className="property-item">
            <a className="property-img" href="single-listing-two.html">
              <img src="images/property/property_1.jpg" alt="#" />
            </a>
            <ul className="feature_text">
              <li className="feature_cb">
                <span> Featured</span>
              </li>
              <li className="feature_or">
                <span>For Sale</span>
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
              <a href="single-listing-one.html">Villa on Hartford</a>
            </h4>
            <div className="property-location">
              <i className="fa fa-map-marker-alt"></i>
              <p>2854 Meadow View Drive, Hartford, USA</p>
            </div>
            <div className="trend-open mt-10">
              <p> 250.000.000 VND </p>
            </div>
            <ul className="property-feature">
              <li>
                {" "}
                <i className="fas fa-bed"></i>
                <span>4 Bedrooms</span>
              </li>
              <li>
                {" "}
                <i className="fas fa-bath"></i>
                <span>3 Bath</span>
              </li>
              <li>
                {" "}
                <i className="fas fa-arrows-alt"></i>
                <span>2142 sq ft</span>
              </li>
              <li>
                {" "}
                <i className="fas fa-car"></i>
                <span>2 Garage</span>
              </li>
            </ul>
            <div className="trending-bottom" style={{ padding: "15px 0px" }}>
              <div className="trend-right float-right">
                <div className="trend-open">
                  <button
                    class="btn v4 ml-2"
                    style={{
                      background: "#6449e7",
                      border: "1px solid transparent",
                    }}
                  >
                    <i class="ion-android-add-circle"></i> Xem chi tiết
                  </button>
                  <button
                    class="btn v4 ml-2"
                    style={{
                      background: "#6449e7",
                      border: "1px solid transparent",
                    }}
                  >
                    <i class="ion-android-add-circle"></i> Mua
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(requestFetch());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
