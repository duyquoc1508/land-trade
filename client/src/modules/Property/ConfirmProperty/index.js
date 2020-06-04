import React, { Component } from "react";
import { connect } from "react-redux";
import PropertyStandard from "../PropertyStandard";
import { activateCertificateRequest } from "./action";

const ComfirmProperty = (props) => {
  console.log(props);
  return (
    <div className="mt-85 container">
      <PropertyStandard match={props.match} history={props.history} />
      <div
        className="listing-button mb-50"
        style={{
          position: "absolute",
          right: "70px",
          bottom: "30px !important",
          top: "unset",
        }}
      >
        <button
          className="btn v4"
          onClick={() => props.activateCert(props.match.params.idInBlockchain)}
        >
          {/* <i className="ion-android-delete"></i>  */}
          Phê duyệt
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //   idInBlockchain:
  // state.propertyDetail && state.propertyDetail.data.idInBlockchain,
});

const mapDispatchToProps = (dispatch) => {
  return {
    activateCert: (idInBlockchain) => {
      dispatch(activateCertificateRequest(idInBlockchain));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComfirmProperty);
