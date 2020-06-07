import React from "react";

const CardProperty = (props) => {
  return (
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
            <i className="fas fa-map-marker-alt"></i>2854 Meadow View Drive,
            Hartford, USA
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
      </div>
    </div>
  );
};

export default CardProperty;
