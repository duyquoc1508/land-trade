import React, { Component } from "react";

class ListProperties extends Component {
  render() {
    let { list } = this.props;
    return (
      <div className="viewd-item-wrap">
        {list.map((property, index) => (
          <div className={`most-viewed-item`} key={index}>
            <div className="most-viewed-img">
              <a href="#">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/images/property/property_1.jpg`}
                  alt="..."
                />
              </a>
              <ul className="feature_text">
                <li className="feature_or">
                  {property.state === 0 ? "Chờ duyệt" : ""}
                  {property.state === 1 ? "Đã duyệt" : ""}
                  {property.state === 2 ? "Đang bán " : ""}
                </li>
              </ul>
            </div>
            <div className="most-viewed-detail">
              <h3>
                <a href="single-listing-one.html">{property._id}</a>
              </h3>
              <p className="list-address">
                <i className="fas fa-map-marker-alt"></i>
                {property.properties.landLot.address}
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
        ))}
      </div>
    );
  }
}

export default ListProperties;
