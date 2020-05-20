import React, { Component } from "react";
import { connect } from "react-redux";
import { requestLogin } from "./actions";

class ButtonLogin extends Component {
  render() {
    let { handleClick } = this.props;
    return (
      <li className="">
        <button className="btn v3" onClick={handleClick}>
          <i className="lnr lnr-home"></i>
          Đăng Nhập{" "}
        </button>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.login,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(requestLogin());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLogin);
