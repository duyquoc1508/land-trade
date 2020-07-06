import React, { Component } from "react";
import "./step.css";

import Info from "./info";
import Email from "./email";
import CMND from './cmnd'

export default class verifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      header: ["Cập nhập thông tin", "CMND", "Xác thực email" ],
    };
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    this.setState({ currentStep: this.getStep() });
  }

  getStep() {
    return Number(new URLSearchParams(location.search).get("step")) || 0;
  }

  // nextStep() {
  //   return this.getStep() + 1;
  // }

  renderStep() {
    return this.state.header.map((value, index) => (
      <li
        className={index <= this.state.currentStep ? "active" : ""}
        key={index}
      >
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span>{value}</span>
        </div>
      </li>
    ));
  }

  renderForm(step) {
    switch (step) {
      case 0:
        return <Info />;
      case 1:
        return <CMND />;
      case 2:
        return <Email />;
    }
  }

  render() {
    return (
      <div className="mt-75">
        <ul className="steps">{this.renderStep()}</ul>
        {this.renderForm(this.state.currentStep)}
      </div>
    );
  }
}
