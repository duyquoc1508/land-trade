import React, { Component } from "react";
import { loadScript } from "../../helper/utils";
import axios from "axios";
import formatCurrency from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostDeals: [],
    };
  }
  componentDidMount() {
    loadScript("/js/plugin.js");
    loadScript("/js/main.js");
    axios
      .get(`${process.env.REACT_APP_BASE_URL_API}/certification/selling`)
      .then((response) => {
        this.setState({ mostDeals: response.data.data });
      });
  }
  render() {
    return (
      <div>
        <div
          className="hero-parallax"
          style={{ backgroundImage: "url(images/header/header_11.jpg)" }}
        >
          <div className="overlay op-1"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="hero-slider-item">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                      <div className="header-text v2">
                        <span>Chào mừng bạn đến với </span>
                        <h1>LandTrade</h1>
                        <p>
                          Ứng dụng quản lý và giao dich bất động sản đáng tin
                          cậy.
                        </p>
                        <p>
                          {" "}
                          Thông tin chính xác, minh bạch, bảo mật cho người dùng
                          dựa trên công nghệ Blockchain.
                        </p>
                        {/* <div className="row">
                          <div className="col-sm-12">
                            <div className="search_btn">
                              <Link to={`/listing`}>
                                Tìm kiếm ngay
                              </Link>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-xl-4 offset-xl-2 col-lg-5 offset-lg-1 col-md-12">
                      <div className="hero-slider-info">
                        <form className="hero__form v3 filter listing-filter">
                          <h4>Tìm ngôi nhà mơ ước của bạn</h4>
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="input-search">
                                <input
                                  type="text"
                                  name="place-event"
                                  id="place-event"
                                  placeholder="Nhập địa chỉ..."
                                />
                              </div>
                            </div>
                            {/* <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Property Status</option>
                                <option>Any</option>
                                <option>For Rent</option>
                                <option>For Sale</option>
                              </select>
                            </div> */}
                            <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Loại tài sản</option>
                                <option>Đất</option>
                                <option>Nhà ở riêng lẻ</option>
                                <option>Nhà chung cư</option>
                              </select>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Phòng ngủ</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                              </select>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Phòng tắm</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                              </select>
                            </div>
                            <div className="col-lg-12 col-md-8 col-sm-12">
                              <div className="filter-sub-area style1">
                                <div className="filter-title mb-10">
                                  <p style={{ width: "100%" }}>
                                    Giá :{" "}
                                    <span style={{ width: "85%" }}>
                                      <input type="text" id="amount_two" />
                                    </span>
                                  </p>
                                </div>
                                <div
                                  id="slider-range_two"
                                  className="price-range mb-20"
                                ></div>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="search_btn">
                                <a
                                  onClick={() => {
                                    this.props.history.push("/listings");
                                  }}
                                >
                                  Tìm kiếm
                                </a>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-130">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title v1">
                {/* <p>Browse popular properties around the world</p> */}
                <h2>Địa điểm nổi bật </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="property-place pb-110">
          <div className="popular-place-wrap v2">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-30">
                  <Link to="/listings?city=Ho+Chi+Minh">
                    <div className="single-place-wrap">
                      <div className="single-place-image">
                        <img src="images/places/place_10.jpg" alt="place" />
                      </div>
                      <span className="single-place-title">Hồ Chí Minh</span>
                      <div className="single-place-content">
                        {/* <h3>Có 80 bất động đang bán</h3> */}
                        <p>
                          Xem thêm <i className="lnr lnr-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-30">
                  <Link to="/listings?city=Da+Nang">
                    <div className="single-place-wrap">
                      <div className="single-place-image">
                        <img src="images/places/place_7.jpg" alt="place" />
                      </div>
                      <span className="single-place-title">Đà Nẵng</span>
                      <div className="single-place-content">
                        {/* <h3>Có 80 bất động đang bán</h3> */}
                        <p>
                          Xem thêm <i className="lnr lnr-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-30">
                  <Link to="/listings?city=Ha+Noi">
                    <div className="single-place-wrap">
                      <div className="single-place-image">
                        <img src="images/places/place_13.jpg" alt="place" />
                      </div>
                      <span className="single-place-title">Hà Nội</span>
                      <div className="single-place-content">
                        {/* <h3>Có 80 bất động đang bán</h3> */}
                        <p>
                          Xem thêm <i className="lnr lnr-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-30">
                  <Link to="/listings?city=Da+Lat">
                    <div className="single-place-wrap">
                      <div className="single-place-image">
                        <img src="images/places/place_17.jpg" alt="place" />
                      </div>
                      <span className="single-place-title">Đà Lạt</span>
                      <div className="single-place-content">
                        {/* <h3>Có 80 bất động đang bán</h3> */}
                        <p>
                          Xem thêm <i className="lnr lnr-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-30">
                  <Link to="/listings?city=Vung+Tau">
                    <div className="single-place-wrap">
                      <div className="single-place-image">
                        <img src="images/places/place_15.jpg" alt="place" />
                      </div>
                      <span className="single-place-title">Vũng Tàu</span>
                      <div className="single-place-content">
                        {/* <h3>Có 80 bất động đang bán</h3> */}
                        <p>
                          Xem thêm <i className="lnr lnr-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.mostDeals.length > 0 && (
          <div className="featured-property-section v2 bg-cb">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-3 col-lg-12">
                  <div className="section-title v2">
                    {/* <p>Giao dịch nhiều nhất</p> */}
                    <h3>Bất động sản nổi bật</h3>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12">
                  <div className="featured-property-wrap v2 swiper-container">
                    <div className="swiper-wrapper">
                      {this.state.mostDeals.map((item, index) => (
                        <div
                          className="swiper-slide single-property-box"
                          key={index}
                        >
                          <div className="property-item">
                            <Link
                              className="property-img"
                              to={`/property/${item.transactionHash}`}
                            >
                              <img
                                src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${item.images[0]}`}
                                alt="..."
                              />{" "}
                            </Link>
                            <ul className="feature_text">
                              <li className="feature_or">
                                <span>Đang bán</span>
                              </li>
                            </ul>
                            <div className="property-author-wrap">
                              <Link
                                to={`/property/${item.transactionHash}`}
                                className="property-author"
                              >
                                <h5 style={{ color: "#2a2a2a" }}>
                                  {item.moreInfo.title}
                                </h5>
                              </Link>
                              <ul className="property-feature">
                                <li>
                                  <span
                                    style={{ color: "white", fortSize: "16px" }}
                                  >
                                    {item.moreInfo.numOfBedrooms} phòng ngủ
                                  </span>
                                </li>
                                <li>
                                  <span
                                    style={{ color: "white", fortSize: "16px" }}
                                  >
                                    {item.moreInfo.numOfBathrooms} phòng tắm
                                  </span>
                                </li>
                                <li>
                                  <span
                                    style={{ color: "white", fortSize: "16px" }}
                                  >
                                    {item.moreInfo.areaFloor} m2
                                  </span>
                                </li>
                              </ul>
                              <div className="featured-price mt-10">
                                <p>{formatCurrency(item.moreInfo.price)} VNĐ</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="slider-btn v2 featured_prev">
                      <i className="lnr lnr-arrow-left"></i>
                    </div>
                    <div className="slider-btn v2 featured_next">
                      <i className="lnr lnr-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HomePage;
