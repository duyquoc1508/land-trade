import React, { Component } from "react";
import { connect } from "react-redux";

class index extends Component {
  render() {
    let { user } = this.props;
    return user && user.isVerifired == 0 ? (
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
    ) : user.isVerifired == 1 ? (
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
