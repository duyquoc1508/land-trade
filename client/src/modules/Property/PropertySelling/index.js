import React from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { cancelSaleRequest } from "./action";

function PropertySelling({ properties, cancelSale }) {
  const history = useHistory();

  return (
    <div className="viewd-item-wrap">
      {properties.map((property, index) => (
        <div className={`most-viewed-item`} key={index}>
          <div className="most-viewed-img">
            <a >
              <img
                src={`${process.env.REACT_APP_BASE_URL}/images/property/property_1.jpg`}
                alt="..."
              />
            </a>
            <ul className="feature_text">
              <li className="feature_or">Đang bán</li>
            </ul>
          </div>
          <div className="most-viewed-detail">
            <h3>
              {/* <Link to={`/user/my-properties/${property.transactionHash}`}> */}
              {property.transactionHash.substr(0, 21) +
                "..." +
                property.transactionHash.substr(50)}
              {/* </Link> */}
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
            {/* <div className="views">
                Views : <span>{property.transactionHash.length}</span>
              </div> */}
          </div>
          <div className="listing-button">
            <button
              className="btn v3"
              onClick={() =>
                history.push(
                  `property/${property.transactionHash}`
                )
              }
            >
              <i className="ion-edit"></i> Chi tiết
            </button>
            <button
              className="btn v4 ml-2"
              onClick={() => cancelSale(property._id)}
            >
              <i className="ion-android-delete"></i> Hủy bán
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    properties: state.myListing.properties.filter(
      (property) => property.state === 2
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelSale: (idCertificate) => {
      dispatch(cancelSaleRequest(idCertificate));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertySelling);
