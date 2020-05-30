import React, { Component } from "react";
import { connect } from "react-redux";
// import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
// import { makeStyles } from "@material-ui/core/styles";

import { loadScript } from "../../../helper/utils";
import * as actions from "./actions";
import RealEstateContract from "../../../contracts/RealEstate.json";
import Web3 from "web3";
import { realEstateContractAddress } from "../../../../config/common-path";
import getWeb3 from "../../../helper/getWeb3"

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
    await this.listenEventFromBlockchain()
  }

  listenEventFromBlockchain = async () => {
    const web3 = await getWeb3();
    const realEstateContract = new web3.eth.Contract(RealEstateContract.abi, realEstateContractAddress);
    realEstateContract.events
      .NewCertificate()
      .on("data", (event) => {
        console.log("index -> componentDidMount -> result", event.returnValues);
        this.props.createSuccess();
        // then push to screen this property
      })
      .on("error", console.error);
  }

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
          {this.props.addProperty.success ? (
            <Snackbar
              open={this.state.open}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={this.handleClose}
              // message={this.props.addProperty.messages}
              autoHideDuration={2000}
            >
              <Alert onClose={this.handleClose} severity="success">
                {this.props.addProperty.messages}
              </Alert>
            </Snackbar>
          ) : (
              ""
            )}
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
  // realEstateContract: state.instanceContracts.realEstate
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (data) => {
      dispatch(actions.fillForm(data));
    },
    createSubmit: (data) => {
      dispatch(actions.requestCreate(data));
    },
    createSuccess: () => {
      dispatch(actions.createSuccess())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);
