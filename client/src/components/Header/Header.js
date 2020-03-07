import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ButtonLogin from "../../modules/Login";
import { connect } from "react-redux";
import Cookie from "../../helper/cookie";
const menus = [
  {
    name: "Trang Chủ",
    to: "/",
    exact: true
  },
  {
    name: "Mua Bán",
    to: "/listings",
    exact: false
  }
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        var active = match ? "active" : "";
        return (
          <li className={active}>
            <Link to={to}>{label}</Link>
          </li>
        );
      }}
    />
  );
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAuth: "setting-menu js-right-sidebar d-none d-lg-block",
      toggleAuthStatus: false,
      toggleNotifications: "header-button-item has-noti js-item-menu",
      toggleNotificationsStatus: false
    };
  }

  changeToggleAuth = () => {
    if (!this.state.toggleAuthStatus) {
      // console.log("show");
      this.setState({ toggleAuthStatus: true });
      this.setState({
        toggleAuth:
          "setting-menu js-right-sidebar d-none d-lg-block show-sidebar"
      });
    } else {
      // console.log("close");
      this.setState({ toggleAuthStatus: false });
      this.setState({
        toggleAuth: "setting-menu js-right-sidebar d-none d-lg-block"
      });
    }
  };
  changeToggleNotifications = () => {
    if (!this.state.toggleNotificationsStatus) {
      this.setState({ toggleNotificationsStatus: true });
      this.setState({
        toggleNotifications:
          "header-button-item has-noti js-item-menu show-dropdown"
      });
    } else {
      this.setState({ toggleNotificationsStatus: false });
      this.setState({
        toggleNotifications: "header-button-item has-noti js-item-menu"
      });
    }
  };
  render() {
    return (
      <header className="db-top-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-3 col-sm-3 col-4">
              <Link className="navbar-brand" to={"/"}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/images/logo.jpg`}
                  alt="logo"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-md-7 col-sm-3 col-2">
              <div className="site-navbar-wrap v2 style2">
                <div className="site-navbar">
                  <nav className="site-navigation">
                    <div className="container">
                      <ul className="site-menu js-clone-nav d-none d-lg-block">
                        {this.showMenus(menus)}
                      </ul>
                    </div>
                  </nav>
                  <div className="d-lg-none sm-right">
                    <a href="#" className="mobile-bar js-menu-toggle">
                      <span className="lnr lnr-menu"></span>
                    </a>
                  </div>

                  <div className="site-mobile-menu">
                    <div className="site-mobile-menu-header">
                      <div className="site-mobile-menu-close  js-menu-toggle">
                        <span className="lnr lnr-cross"></span>{" "}
                      </div>
                    </div>
                    <div className="site-mobile-menu-body"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-sm-6 col-6">
              {this.props.checkAuth === "" ? (
                <ButtonLogin />
              ) : (
                <div className="header-button">
                  <div
                    className={this.state.toggleNotifications}
                    onClick={this.changeToggleNotifications}
                  >
                    <i className="ion-ios-bell-outline"></i>
                    <div className="notifi-dropdown js-dropdown">
                      <div className="notifi__item">
                        <div className="content">
                          <p>
                            Your Property <b>Villa On Hartford</b> has been
                            approved!
                          </p>
                          <span className="date">5 min ago</span>
                        </div>
                      </div>
                      <div className="notifi__item">
                        <div className="content">
                          <p>You have 3 unread Messages</p>
                          <span className="date">5 min ago</span>
                        </div>
                      </div>
                      <div className="notify-bottom text-center py-20">
                        <a href="#">View All Notification</a>
                      </div>
                    </div>
                  </div>
                  <div
                    className="header-button-item js-sidebar-btn"
                    onClick={this.changeToggleAuth}
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/images/dashboard/agent_db_1.jpg`}
                      alt="..."
                    />
                    <span>
                      Tony <i className="ion-arrow-down-b"></i>
                    </span>
                  </div>
                  <div className={this.state.toggleAuth}>
                    <div className="account-dropdown__body">
                      <div className="account-dropdown__item">
                        <Link
                          to="/add-property"
                          onClick={this.changeToggleAuth}
                        >
                          Số Hóa Tài Sản
                        </Link>
                      </div>
                      <div className="account-dropdown__item">
                        <Link
                          to={"/user/profile"}
                          onClick={this.changeToggleAuth}
                        >
                          Trang cá nhân
                        </Link>
                      </div>
                      <div className="account-dropdown__item">
                        <a
                          type="button"
                          onClick={() => {
                            console.log("click logout");
                            Cookie.setCookie("accessToken", "");
                          }}
                          href="/"
                        >
                          Đăng xuất
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  showMenus = menus => {
    var result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <MenuLink
            key={index}
            label={menu.name}
            to={menu.to}
            activeOnlyWhenExact={menu.exact}
          />
        );
      });
    }
    return result;
  };
}

const mapStateToProps = state => ({
  checkAuth: state.login.accessToken
});

export default connect(mapStateToProps)(Menu);
