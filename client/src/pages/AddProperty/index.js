import React, { Component } from "react";
import { connect } from "react-redux";

import { loadScript } from "../../helper/utils";
import * as actions from "./actions";

import Tab from "./sections/tab";

class AddProperty extends Component {
  componentDidMount() {
    loadScript("js/plugin.js");
    loadScript("js/main.js");
  }
  render() {
    const { handleClick, createSubmit } = this.props;
    // console.log(this.props);
    return (
      <div className="container mt-75">
        <div className="row">
          <Tab handleClick={handleClick} createSubmit={createSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addProperty: state.addProperty,
  form: state.form
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
