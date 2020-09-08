import React, { Component } from "react";
import { connect } from "react-redux";

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    let { user } = this.props;
    return this.props.history.location.pathname ===
      "/verify-account" ? null : user &&
      user.isVerified == 0 &&
      user.role == "owner" ? (
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          backgroundColor: "green",
          padding: "20px 0",
          color: "white",
          textAlign: "center",
          zIndex: "999999999999",
        }}
      >
        Vui lòng xác thực tài khoản <a href="/verify-account">tại đây</a>
      </div>
    ) : user.isVerified == 1 && user.role == "owner" ? (
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          backgroundColor: "green",
          padding: "20px 0",
          color: "white",
          textAlign: "center",
          zIndex: "999999999999",
        }}
      >
        Vui lòng liên hệ công chứng viên để xác thực tài khoản
      </div>
    ) : (
      ""
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
  };
};

export default connect(mapStateToProps, null)(index);
