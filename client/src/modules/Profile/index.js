import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => ({ user: state.user });

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="recent-activity">
              <div className="act-title">
                <h5>Profile Details</h5>
              </div>
              <div className="profile-wrap">
                <div className="row mb-50">
                  <div className="col-lg-5 col-md-6 col-sm-5">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/images/agents/agent_1.jpg`}
                      alt="..."
                      className="img-responsive"
                    />
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-7">
                    <div className="agent-details">
                      <h3>Thông tin cá nhân người dùng</h3>
                      <ul className="address-list">
                        <li>
                          <span>Họ tên:</span>
                          {this.props.user.fullName ||
                            "Vui lòng cập nhập thông tin"}
                        </li>
                        <li>
                          <span>Public Address:</span>
                          {this.props.user.publicAddress ||
                            "Vui lòng cập nhập thông tin"}
                        </li>
                        <li>
                          <span>CMND/Căn cước:</span>
                          {this.props.user.idNumber ||
                            "Vui lòng cập nhập thông tin"}
                        </li>
                        <li>
                          <span>Số điện thoại:</span>
                          {this.props.user.phoneNumber ||
                            "Vui lòng cập nhập thông tin"}
                        </li>
                        <li>
                          <span>Email:</span>
                          {this.props.user.email ||
                            "Vui lòng cập nhập thông tin"}
                        </li>
                      </ul>
                      <ul className="social-buttons style1">
                        <li>
                          <a href="#">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-pinterest-p"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-youtube"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-dribbble"></i>
                          </a>
                        </li>
                      </ul>
                      <Link to="/user/profile/edit" className="btn v3 mt-50">
                        Cập nhập thông tin cá nhân
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);