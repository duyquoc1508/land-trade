import React, { Component } from "react";
import { connect } from "react-redux";
// import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
// import { makeStyles } from "@material-ui/core/styles";

import { loadScript } from "../../../helper/utils";
import * as actions from "./actions";

import Tab from "./sections/tab";

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    loadScript("js/plugin.js");
    loadScript("js/main.js");
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
                horizontal: "right"
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

const mapStateToProps = state => ({
  addProperty: state.addProperty,
  form: state.form,
  login: state.login
});

const mapDispatchToProps = dispatch => {
  return {
    handleClick: data => {
      dispatch(actions.fillForm(data));
    },
    createSubmit: data => {
      dispatch(actions.requestCreate(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);
