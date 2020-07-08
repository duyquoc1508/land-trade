import React from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";

function PropertyPending({ properties }) {
  const history = useHistory();
  return properties.length === 0 ? (
    <h3 className="post-title text-center">
      Không có tài sản nào đang chờ duyệt
    </h3>
  ) : (
    <div className="viewd-item-wrap row">
      {properties.map((property, index) => (
        <div className="col-xl-4 col-md-6 col-sm-12" key={index}>
          <div className="single-property-box">
            <div className="property-item">
              <Link to={`property-standard/${property.transactionHash}`}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL_IMAGE}/images/${property.images[0]}`}
                  alt="#"
                />
              </Link>
              <ul className="feature_text">
                <li className="feature_or">
                  <span>
                    {" "}
                    {property.state == 0
                      ? "Chờ duyệt"
                      : property.state == 1
                      ? "Đã duyệt"
                      : "Đang bán"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="property-title-box">
              <div className="property-location">
                <i className="fa fa-map-marker-alt"></i>
                <p>{property.properties.landLot.address}</p>
              </div>

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
                        history.push(
                          `/property-standard/${property.transactionHash}`
                        )
                      }
                    >
                      <i className="ion-edit"> </i>Chi tiết
                    </button>
                    {property.state == 0 ? (
                      <button
                        className="btn v4 ml-2"
                        style={{
                          background: "#6449e7",
                          border: "1px solid transparent",
                        }}
                        onClick={() =>
                          history.push(
                            `/my-property/confirm/${property.transactionHash}/${property.idInBlockchain}`
                          )
                        }
                      >
                        <i className="ion-edit"> </i>Phê duyệt
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, null)(PropertyPending);
