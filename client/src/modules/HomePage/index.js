import React, { Component } from "react";
import { loadScript } from "../../helper/utils";

class HomePage extends Component {
  componentDidMount() {
    loadScript("js/plugin.js");
    console.log("load main");
    loadScript("js/main.js");
  }
  render() {
    return (
      <div>
        <div className="hero-parallax bg-fixed">
          <div className="overlay op-1"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="hero-slider-item">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                      <div className="header-text v2">
                        <span>Click or call we do it all </span>
                        <h1>Find Properties that make you money</h1>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Eligendi quia fugiat ea adipisci earum
                          repudiandae, corporis culpa esse distinctio
                          consequuntur?
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-4 offset-xl-2 col-lg-5 offset-lg-1 col-md-12">
                      <div className="hero-slider-info">
                        <form className="hero__form v3 filter listing-filter">
                          <h4>Find your dream home</h4>
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="input-search">
                                <input
                                  type="text"
                                  name="place-event"
                                  id="place-event"
                                  placeholder="Enter Property, Location, Landmark ..."
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Property Status</option>
                                <option>Any</option>
                                <option>For Rent</option>
                                <option>For Sale</option>
                              </select>
                            </div>
                            <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Property Type</option>
                                <option>Residential</option>
                                <option>Commercial</option>
                                <option>Land</option>
                              </select>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Bed</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                              </select>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-6 mb-3">
                              <select className="hero__form-input  custom-select">
                                <option>Bath</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                              </select>
                            </div>
                            <div className="col-lg-12 col-md-8 col-sm-12">
                              <div className="filter-sub-area style1">
                                <div className="filter-title mb-10">
                                  <p>
                                    Price :{" "}
                                    <span>
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
                                <a href="grid-left-sidebar.html">
                                  Search Property
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
                <p>Browse popular properties around the world</p>
                <h2>Find Properties in Your city</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="property-place pb-110">
          <div className="popular-place-wrap v2">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-30">
                  <a href="grid-fullwidth-map.html">
                    <div className="single-place-wrap">
                      <div className="single-place-image">
                        <img src="images/places/place_10.jpg" alt="place" />
                      </div>
                      <span className="single-place-title">Havana</span>
                      <div className="single-place-content">
                        <h3>80 Property Listings</h3>
                        <p>
                          See all Listings{" "}
                          <i className="lnr lnr-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-30">
                  <a href="grid-fullwidth-map.html">
                    <div className="single-place-wrap">
                      <div className="single-place-image">
                        <img src="images/places/place_7.jpg" alt="place" />
                      </div>
                      <span className="single-place-title">Prague</span>
                      <div className="single-place-content">
                        <h3>120 Apartment for sale</h3>
                        <p>
                          See all Listings{" "}
                          <i className="lnr lnr-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-30">
                  <a href="grid-fullwidth-map.html">
                    <div className="single-place-wrap">
                      <div className="single-place-image">
                        <img src="images/places/place_13.jpg" alt="place" />
                      </div>
                      <span className="single-place-title">Miami</span>
                      <div className="single-place-content">
                        <h3>30 Luxury villa</h3>
                        <p>
                          See all Listings{" "}
                          <i className="lnr lnr-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-30">
                  <a href="grid-fullwidth-map.html">
                    <div className="single-place-wrap">
                      <div className="single-place-image">
                        <img src="images/places/place_17.jpg" alt="place" />
                      </div>
                      <span className="single-place-title">Milan</span>
                      <div className="single-place-content">
                        <h3>135 Property for sale</h3>
                        <p>
                          See all Listings{" "}
                          <i className="lnr lnr-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-30">
                  <a href="grid-fullwidth-map.html">
                    <div className="single-place-wrap">
                      <div className="single-place-image">
                        <img src="images/places/place_15.jpg" alt="place" />
                      </div>
                      <span className="single-place-title">New York</span>
                      <div className="single-place-content">
                        <h3>120 houses for Rent</h3>
                        <p>
                          See all Listings{" "}
                          <i className="lnr lnr-arrow-right"></i>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="featured-property-section v2 bg-cb">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3 col-lg-12">
                <div className="section-title v2">
                  <p>Check out some of our</p>
                  <h2>Featured Properties</h2>
                </div>
              </div>
              <div className="col-xl-9 col-lg-12">
                <div className="featured-property-wrap v2 swiper-container">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide single-property-box">
                      <div className="property-item">
                        <a
                          className="property-img"
                          href="single-listing-two.html"
                        >
                          <img src="images/featured/featured_1.jpg" alt="..." />{" "}
                        </a>
                        <ul className="feature_text">
                          <li className="feature_cb">
                            <span>Featured</span>
                          </li>
                          <li className="feature_or">
                            <span>For Rent</span>
                          </li>
                        </ul>
                        <div className="property-author-wrap">
                          <a href="#" className="property-author">
                            <h4>Condo on Hartfold</h4>
                          </a>
                          <ul className="property-feature">
                            <li>
                              <span>3 Bed</span>
                            </li>
                            <li>
                              <span>2 Bath</span>
                            </li>
                            <li>
                              <span>1400 sqft</span>
                            </li>
                          </ul>
                          <div className="featured-price">
                            <p>
                              <span className="per_sale">starts from</span>
                              $34000
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide single-property-box">
                      <div className="property-item">
                        <a
                          className="property-img"
                          href="single-listing-two.html"
                        >
                          <img src="images/featured/featured_8.jpg" alt="..." />{" "}
                        </a>
                        <ul className="feature_text">
                          <li className="feature_cb">
                            <span>Featured</span>
                          </li>
                          <li className="feature_or">
                            <span>For Rent</span>
                          </li>
                        </ul>
                        <div className="property-author-wrap">
                          <a href="#" className="property-author">
                            <h4>Family Apartment </h4>
                          </a>
                          <ul className="property-feature">
                            <li>
                              <span>2 Bed</span>
                            </li>
                            <li>
                              <span>2 Bath</span>
                            </li>
                            <li>
                              <span>1400 sqft</span>
                            </li>
                          </ul>
                          <div className="featured-price">
                            <p>
                              $1200<span className="per_month">month</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide single-property-box">
                      <div className="property-item">
                        <a
                          className="property-img"
                          href="single-listing-two.html"
                        >
                          <img src="images/featured/featured_9.jpg" alt="..." />{" "}
                        </a>
                        <ul className="feature_text">
                          <li className="feature_cb">
                            <span>Featured</span>
                          </li>
                          <li className="feature_or">
                            <span>For Rent</span>
                          </li>
                        </ul>
                        <div className="property-author-wrap">
                          <a href="#" className="property-author">
                            <h4>Villa on Sunbury</h4>
                          </a>
                          <ul className="property-feature">
                            <li>
                              <span>4 Bed</span>
                            </li>
                            <li>
                              <span>3 Bath</span>
                            </li>
                            <li>
                              <span>2400 sqft</span>
                            </li>
                          </ul>
                          <div className="featured-price">
                            <p>
                              <span className="per_sale">starts from</span>
                              $12000
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide single-property-box">
                      <div className="property-item">
                        <a
                          className="property-img"
                          href="single-listing-two.html"
                        >
                          <img
                            src="images/featured/featured_10.jpg"
                            alt="..."
                          />
                        </a>
                        <ul className="feature_text">
                          <li className="feature_cb">
                            <span>Featured</span>
                          </li>
                          <li className="feature_or">
                            <span>For Sale</span>
                          </li>
                        </ul>
                        <div className="property-author-wrap">
                          <a href="#" className="property-author">
                            <h4>Family Apartment</h4>
                          </a>
                          <ul className="property-feature">
                            <li>
                              <span>3 Bed</span>
                            </li>
                            <li>
                              <span>2 Bath</span>
                            </li>
                            <li>
                              <span>2142 sqft</span>
                            </li>
                          </ul>
                          <div className="featured-price">
                            <p>
                              <span className="per_sale">starts from</span>
                              $12000
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide single-property-box">
                      <div className="property-item">
                        <a
                          className="property-img"
                          href="single-listing-two.html"
                        >
                          <img
                            src="images/featured/featured_11.jpg"
                            alt="..."
                          />{" "}
                        </a>
                        <ul className="feature_text">
                          <li className="feature_cb">
                            <span>Featured</span>
                          </li>
                          <li className="feature_or">
                            <span>For Slae</span>
                          </li>
                        </ul>
                        <div className="property-author-wrap">
                          <a href="#" className="property-author">
                            <h4>Luxury Apartment</h4>
                          </a>
                          <ul className="property-feature">
                            <li>
                              <span>3 Bed</span>
                            </li>
                            <li>
                              <span>2 Bath</span>
                            </li>
                            <li>
                              <span>1800 sqft</span>
                            </li>
                          </ul>
                          <div className="featured-price">
                            <p>
                              <span className="per_sale">starts from</span>
                              $12000
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
      </div>
    );
  }
}

export default HomePage;
