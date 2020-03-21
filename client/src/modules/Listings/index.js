import React, { Component } from "react";
import { loadScript } from "../../helper/utils";

class Listings extends Component {
  componentDidMount() {
    loadScript("js/plugin.js");
    console.log("load main");
    loadScript("js/main.js");
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
                    <form className="hero__form v1 filter listing-filter property-filter">
                      <div className="row">
                        <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                          <div className="input-search">
                            <input
                              type="text"
                              name="place-event"
                              id="place-event"
                              placeholder="Enter Property, Location, Landmark ..."
                            />
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                          <select className="hero__form-input  custom-select">
                            <option>Select Area</option>
                            <option>New York</option>
                            <option>California</option>
                            <option>Washington</option>
                            <option>New Jersey</option>
                            <option>Los angeles</option>
                            <option>Florida</option>
                          </select>
                        </div>
                        <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                          <select className="hero__form-input  custom-select">
                            <option>Select City</option>
                            <option>New York</option>
                            <option>California</option>
                            <option>Washington</option>
                            <option>New Jersey</option>
                            <option>Los angeles</option>
                            <option>Florida</option>
                          </select>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 py-3 pl-30 pr-0">
                          <div className="submit_btn">
                            <button className="btn v3" type="submit">
                              Search
                            </button>
                          </div>
                          <div className="dropdown-filter">
                            <span>More Filters</span>
                          </div>
                        </div>
                        <div className="explore__form-checkbox-list full-filter">
                          <div className="row">
                            <div className="col-lg-4 col-md-6 py-1 pr-30">
                              <select className="hero__form-input  custom-select mb-20">
                                <option>Property Status</option>
                                <option>Any</option>
                                <option>For Rent</option>
                                <option>For Sale</option>
                              </select>
                            </div>
                            <div className="col-lg-4 col-md-6 py-1 pr-30 pl-0 ">
                              <select className="hero__form-input  custom-select  mb-20">
                                <option>Property Type</option>
                                <option>Residential</option>
                                <option>Commercial</option>
                                <option>Land</option>
                              </select>
                            </div>
                            <div className="col-lg-4 col-md-6 py-1 pl-0">
                              <select className="hero__form-input  custom-select  mb-20">
                                <option>Max rooms</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                              </select>
                            </div>
                            <div className="col-lg-4 col-md-6 py-1 pr-30 ">
                              <select className="hero__form-input  custom-select  mb-20">
                                <option>Bed</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                              </select>
                            </div>
                            <div className="col-lg-4 col-md-6 py-1 pr-30 pl-0">
                              <select className="hero__form-input  custom-select  mb-20">
                                <option>Bath</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                              </select>
                            </div>
                            <div className="col-lg-4 col-md-6 py-1 pl-0">
                              <select className="hero__form-input  custom-select  mb-20">
                                <option>Agents</option>
                                <option>Bob Haris</option>
                                <option>Ross buttler</option>
                                <option>Andrew Saimons</option>
                                <option>Steve Austin</option>
                              </select>
                            </div>
                            <div className="col-lg-4 col-md-6 py-1 pr-30">
                              <select className="hero__form-input  custom-select  mb-20">
                                <option>Agencies</option>
                                <option>Onyx Equities</option>
                                <option>OVG Real Estate</option>
                                <option>Oxford Properties*</option>
                                <option>Cortland</option>
                              </select>
                            </div>
                            <div className="col-lg-4 col-md-6 py-1 pr-30 pl-0">
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
                                  className="price-range mb-30"
                                ></div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 py-1  pl-0">
                              <div className="filter-sub-area style1">
                                <div className="filter-title  mb-10">
                                  <p>
                                    Area :{" "}
                                    <span>
                                      <input type="text" id="amount_one" />
                                    </span>
                                  </p>
                                </div>
                                <div
                                  id="slider-range_one"
                                  className="price-range mb-30"
                                ></div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 py-1 pr-30">
                              <div className="filter-checkbox">
                                <p>Sort By Features</p>
                                <ul>
                                  <li>
                                    <input
                                      id="check-a"
                                      type="checkbox"
                                      name="check"
                                    />
                                    <label>Air Condition</label>
                                  </li>
                                  <li>
                                    <input
                                      id="check-b"
                                      type="checkbox"
                                      name="check"
                                    />
                                    <label>Swimming Pool</label>
                                  </li>
                                  <li>
                                    <input
                                      id="check-c"
                                      type="checkbox"
                                      name="check"
                                    />
                                    <label>Laundry Room</label>
                                  </li>
                                  <li>
                                    <input
                                      id="check-d"
                                      type="checkbox"
                                      name="check"
                                    />
                                    <label>Free Wifi</label>
                                  </li>
                                  <li>
                                    <input
                                      id="check-e"
                                      type="checkbox"
                                      name="check"
                                    />
                                    <label>Window Covering</label>
                                  </li>
                                  <li>
                                    <input
                                      id="check-f"
                                      type="checkbox"
                                      name="check"
                                    />
                                    <label>Central Heating </label>
                                  </li>
                                  <li>
                                    <input
                                      id="check-g"
                                      type="checkbox"
                                      name="check"
                                    />
                                    <label>24 hour security</label>
                                  </li>
                                  <li>
                                    <input
                                      id="check-h"
                                      type="checkbox"
                                      name="check"
                                    />
                                    <label>Lawn</label>
                                  </li>
                                  <li>
                                    <input
                                      id="check-i"
                                      type="checkbox"
                                      name="check"
                                    />
                                    <label>Gym</label>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 py-1 pr-30 pl-0 ">
                              <div className="filter-checkbox">
                                <p>Sort By Ratings</p>
                                <div>
                                  <input
                                    id="check-w"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label></label>
                                  <div className="list-ratings">
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                  </div>
                                </div>
                                <div>
                                  <input
                                    id="check-x"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label></label>
                                  <div className="list-ratings">
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star-half-alt"></span>
                                  </div>
                                </div>
                                <div>
                                  <input
                                    id="check-y"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label></label>
                                  <div className="list-ratings">
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star-half-alt"></span>
                                    <span className="fas fa-star-half-alt"></span>
                                  </div>
                                </div>
                                <div>
                                  <input
                                    id="check-z"
                                    type="checkbox"
                                    name="check"
                                  />
                                  <label></label>
                                  <div className="list-ratings">
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star"></span>
                                    <span className="fas fa-star-half-alt"></span>
                                    <span className="fas fa-star-half-alt"></span>
                                    <span className="fas fa-star-half-alt"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
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
                      <div className="most-viewed-item">
                        <div className="most-viewed-img">
                          <a href="#">
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/images/property/property_6.jpg`}
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
                            <a href="single-listing-one.html">
                              Biệt thự center home tại quận 7 diện tích lớn có
                              sân vườn đầy đủ tiện ích
                            </a>
                          </h3>
                          <p className="list-address">
                            <i className="fas fa-map-marker-alt"></i>131 midlas
                            , Cecil Lake, BC
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
                        </div>
                      </div>
                      <div className="most-viewed-item">
                        <div className="most-viewed-img">
                          <a href="#">
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/images/property/property_6.jpg`}
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
                            <a href="single-listing-one.html">
                              Biệt thự center home tại quận 7 diện tích lớn có
                              sân vườn đầy đủ tiện ích
                            </a>
                          </h3>
                          <p className="list-address">
                            <i className="fas fa-map-marker-alt"></i>131 midlas
                            , Cecil Lake, BC
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
                        </div>
                      </div>
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

export default Listings;
