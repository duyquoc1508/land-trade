import React, { Component } from "react";
import { loadScript } from "../../helper/utils";
import { connect } from "react-redux";
import Filter from "./sections/filter";
import { requestFetch } from "./actions";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import slugify from "../../utils/slugify";

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingSaleFilter: [],
      page: new URLSearchParams(location.search).get("page") || 1,
    };
  }

  componentDidMount() {
    loadScript("js/plugin.js");
    loadScript("js/main.js");
    this.props.handleClick();
  }

  // check update
  componentDidUpdate(preProps, preState) {
    const query = new URLSearchParams(location.search).get("city");
    if (query) {
      const listingSaleFilter = this.props.listingSale.filter((property) => {
        return slugify(property.properties.landLot.address)
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(query.toLowerCase().replace(/\s/g, ""));
      });
      this.state.listingSaleFilter.length !== listingSaleFilter.length &&
        this.setState({ listingSaleFilter });
    } else {
      this.state.listingSaleFilter.length !== this.props.listingSale.length &&
        this.setState({ listingSaleFilter: this.props.listingSale });
    }
  }

  switchPage(event, page) {
    let pageNumber = page;
    if (page == -1) {
      pageNumber = this.state.page + 1;
    }
    this.setState({ page: pageNumber }, () => {
      this.props.history.push({ search: `?page=${this.state.page}` });
      this.props.handleClick();
    });
  }

  renderItem() {
    return this.state.listingSaleFilter.map((item, index) => (
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
            <div className="trending-bottom" style={{ padding: "15px 0px" }}>
              <div className="trend-right float-right">
                <div className="trend-open">
                  <button
                    className="btn v4 ml-2"
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
                    <i className="ion-android-add-circle"></i> Xem chi tiết
                  </button>
                  {!item.owners.includes(this.props.user.publicAddress) && (
                    <button
                      className="btn v4 ml-2"
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
                      <i className="ion-android-add-circle"></i> Mua
                    </button>
                  )}
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
              <Filter />
              <div className="col-md-12">
                <div className="item-wrapper pt-20">
                  <div className="tab-content" id="myTabContent">
                    {this.state.listingSaleFilter.length === 0 ? (
                      <h3 className="post-title text-center">
                        Không có tài sản nào đang bán
                      </h3>
                    ) : (
                      <div className="tab-content">
                        <div className="row">{this.renderItem()}</div>
                        {/* <!--pagination starts--> */}
                        <div className="post-nav nav-res pt-50  ">
                          <div className="row">
                            <div className="col-md-8 offset-md-2  col-xs-12 ">
                              <div className="page-num text-center">
                                <ul>
                                  <li
                                    className={
                                      this.state.page != 1 ? "" : "active"
                                    }
                                  >
                                    <button
                                      onClick={(e) => this.switchPage(e, 1)}
                                    >
                                      1
                                    </button>
                                  </li>
                                  <li
                                    className={
                                      this.state.page != 2 ? "" : "active"
                                    }
                                  >
                                    <button
                                      onClick={(e) => this.switchPage(e, 2)}
                                    >
                                      2
                                    </button>
                                  </li>
                                  <li
                                    className={
                                      this.state.page != 3 ? "" : "active"
                                    }
                                  >
                                    <button
                                      onClick={(e) => this.switchPage(e, 3)}
                                    >
                                      3
                                    </button>
                                  </li>
                                  {/* <li
                                    className={
                                      this.state.page != 4 ? "" : "active"
                                    }
                                  >
                                    <button
                                      onClick={(e) => this.switchPage(e, 4)}
                                    >
                                      4
                                    </button>
                                  </li> */}
                                  <li
                                    className={
                                      this.state.page > 3 ? "active" : ""
                                    }
                                  >
                                    <button
                                      onClick={(e) => this.switchPage(e, -1)}
                                    >
                                      <i className="lnr lnr-chevron-right"></i>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!--pagination ends--> */}
                      </div>
                    )}
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
