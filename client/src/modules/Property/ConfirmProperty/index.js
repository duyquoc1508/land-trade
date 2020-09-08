import React from "react";
import { connect } from "react-redux";
import PropertyStandard from "../PropertyStandard";
import { activateCertificateRequest } from "./action";

const ConfirmProperty = (props) => {
  // listen event direct from blockchain
  // useEffect(() => {
  //   props.realEstateContract &&
  //     props.realEstateContract.events
  //       .Activate()
  //       .on("data", (event) => {
  //         props.history.push(`/property-standard/${props.match.params.hash}`);
  //         props.activateCertSuccess({
  //           history: props.history,
  //           txHash: event.transactionHash,
  //         });
  //       })
  //       .on("error", console.error);
  // }, [props.realEstateContract]);

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
          disabled={props.loading}
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
  realEstateContract: state.shared.realEstate,
  loading: state.confirmProperty.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    activateCert: (idInBlockchain) => {
      dispatch(activateCertificateRequest(idInBlockchain));
    },
    // activateCertSuccess: (data) => {
    //   dispatch(activateCertificateSuccess(data));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmProperty);
