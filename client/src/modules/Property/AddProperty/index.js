import React, { Component } from "react";
import { connect } from "react-redux";

import { loadScript } from "../../../helper/utils";
import * as actions from "./actions";
import RealEstateContract from "../../../contracts/RealEstate.json";
import { realEstateContractAddress } from "../../../../config/common-path";

import Tab from "./sections/tab";

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount = async () => {
    if (window.screen.width < 1200) {
      alert("Giao diện chưa hỗ trợ trên thiết bị di dộng!");
    }
    loadScript("js/plugin.js");
    loadScript("js/main.js");
    // await this.listenEventFromBlockchain();
  };

  // listenEventFromBlockchain = async () => {
  //   this.props.realEstateContract &&
  //     this.props.realEstateContract.events
  //       .NewCertificate()
  //       .on("data", (event) => {
  //         setTimeout(() => {
  //           this.props.createSuccess({
  //             history: this.props.history,
  //             txHash: event.transactionHash,
  //           });
  //         }, 500); // handle case SUCCESS before WAITING => toast could not be updated

  //         // then push to screen this property
  //       })
  //       .on("error", console.error);
  // };

  handleClose() {
    this.setState({ open: false });
  }
  render() {
    const { handleClick, createSubmit } = this.props;
    if (this.props.login.accessToken === "") {
      return "";
    }
    return (
      <div className="container mt-150">
        <div className="row">
          <Tab
            handleClick={handleClick}
            createSubmit={createSubmit}
            handleCreate={this.props.addProperty.success}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addProperty: state.addProperty,
  form: state.form,
  login: state.login,
  loading: state.loading,
  realEstateContract: state.shared.realEstate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (data) => {
      dispatch(actions.fillForm(data));
    },
    createSubmit: (data) => {
      dispatch(actions.requestCreate(data));
    },
    // createSuccess: (txHash) => {
    //   dispatch(actions.createSuccess(txHash));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);
