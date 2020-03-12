import React, { Component } from "react";

class ListProperties extends Component {
  render() {
    return (
      <div className="container mt-75 mb-100">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="recent-activity my-listing">
              <div className="act-title">
                <h5>My Listings</h5>
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
                      <i className="fas fa-map-marker-alt"></i>2854 Meadow View
                      Drive, Hartford, USA
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
                  <div className="listing-button">
                    <a href="#" className="btn v3">
                      <i className="ion-edit"></i> Edit
                    </a>
                    <a href="#" className="btn v4">
                      <i className="ion-android-delete"></i> Delete
                    </a>
                  </div>
                </div>
                <div className="most-viewed-item">
                  <div className="most-viewed-img">
                    <a href="#">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/images/property/property_3.jpg`}
                        alt="..."
                      />
                    </a>
                    <ul className="feature_text">
                      <li className="feature_or">
                        <span>For Rent</span>
                      </li>
                    </ul>
                  </div>
                  <div className="most-viewed-detail">
                    <h3>
                      <a href="single-listing-one.html">
                        Family home in Glasgow
                      </a>
                    </h3>
                    <p className="list-address">
                      <i className="fas fa-map-marker-alt"></i>60 High St,
                      Glasgow, London
                    </p>
                    <div className="trend-open">
                      <p>
                        $7500<span className="per_month">month</span>
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
                      Views : <span>124</span>
                    </div>
                  </div>
                  <div className="listing-button">
                    <a href="#" className="btn v3">
                      <i className="ion-edit"></i> Edit
                    </a>
                    <a href="#" className="btn v4">
                      <i className="ion-android-delete"></i> Delete
                    </a>
                  </div>
                </div>
                <div className="most-viewed-item">
                  <div className="most-viewed-img">
                    <a href="#">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/images/property/property_2.jpg`}
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
                      <a href="single-listing-one.html">Bay view Apartment</a>
                    </h3>
                    <p className="list-address">
                      <i className="fas fa-map-marker-alt"></i>1797 Hillcrest
                      Lane, Boulevard, CA
                    </p>
                    <div className="trend-open">
                      <p>
                        $25000<span className="per_month">month</span>
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
                      Views : <span>78</span>
                    </div>
                  </div>
                  <div className="listing-button">
                    <a href="#" className="btn v3">
                      <i className="ion-edit"></i> Edit
                    </a>
                    <a href="#" className="btn v4">
                      <i className="ion-android-delete"></i> Delete
                    </a>
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

export default ListProperties;
