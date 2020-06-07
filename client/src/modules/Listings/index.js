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
      <div className="most-viewed-item" key={index}>
        <div className="most-viewed-img">
          <a href="#">
            <img
              src={`${process.env.REACT_APP_BASE_URL}/images/property/property_6.jpg`}
              alt="..."
            />
          </a>
          <ul className="feature_text">
            <li className="feature_or">
              <span>Đang bán</span>
            </li>
          </ul>
        </div>
        <div className="most-viewed-detail">
          <h3>
            <a href="single-listing-one.html">{item.title}</a>
          </h3>
          <p className="list-address">
            <i className="fas fa-map-marker-alt"></i>
            {(item.properties.house && item.properties.house.address) ||
              item.properties.landLot.address}
          </p>
          <div className="trend-open">
            <p>
              <span className="per_sale">starts from</span>
              $90000
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
            Views : <span>45</span>
          </div>
          <div className="listing-button">
            <button
              className="btn v3"
              onClick={() =>
                this.props.history.push(
                  `/create-transaction/${item.transactionHash}`
                )
              }
            >
              <i className="ion-edit"></i> Mua
            </button>
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
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <Filter />
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row pt-60   align-items-center">
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
                  <div className="col-lg-8 col-sm-12">
                    <div className="item-element res-box  text-right sm-left">
                      <p>
                        Showing <span>1-15 of 69</span> Listings
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item-wrapper pt-40   ">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane  show active fade property-list fullwidth"
                      id="list-view"
                    >
                      {this.renderItem()}
                    </div>
                    <div className="post-nav nav-res pt-50  ">
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
                    </div>
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
