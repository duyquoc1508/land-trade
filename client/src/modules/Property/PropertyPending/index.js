import React from "react";
import { connect } from "react-redux";
import { activateCertificateRequest } from "./action";

function PropertyPending({ properties, activateCert }) {
  return (
    <div className="viewd-item-wrap">
      {properties.map((property, index) => (
        <div className={`most-viewed-item`} key={index}>
          <div className="most-viewed-img">
            <a href="#">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/images/property/property_1.jpg`}
                alt="..."
              />
            </a>
            <ul className="feature_text">
              <li className="feature_or">Chờ duyệt</li>
            </ul>
          </div>
          <div className="most-viewed-detail">
            <h3>
              <a href="single-listing-one.html">
                {property.transactionHash.substr(0, 21) +
                  "..." +
                  property.transactionHash.substr(50)}
              </a>
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
            <a href="#" className="btn v3">
              <i className="ion-edit"></i> Chi tiết
            </a>
            <button
              className="btn v4"
              onClick={() => activateCert(property.idInBlockchain)}
            >
              {/* <i className="ion-android-delete"></i>  */}
              Phê duyệt
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
      (property) => property.state === 0
    ),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    activateCert: (idCertificate) =>
      dispatch(activateCertificateRequest(idCertificate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPending);
