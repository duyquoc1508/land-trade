import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ButtonLogin from "../../pages/Login";
import { connect } from "react-redux";
// import Cookie from "../../helper/cookie";
import { loadScript } from "../../helper/utils";

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
  },
  {
    name: "Đăng Ký Token",
    to: "/add-property",
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
  componentDidMount() {
    console.log("load plugin");
    loadScript("js/plugin.js");
    console.log("load dashboard");
    loadScript("js/dashboard.js");
  }

  render() {
    // let checkAuth = Cookie.getCookie("accessToken");
    // console.log(this.props.checkAuth);
    return (
      <header className="db-top-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-3 col-sm-3 col-4">
              <a className="navbar-brand" href="#">
                <img
                  src="images/logo-blue.png"
                  alt="logo"
                  className="img-fluid"
                />
              </a>
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
              {!this.props.checkAuth ? (
                <ButtonLogin />
              ) : (
                <div className="header-button">
                  <div className="header-button-item has-noti js-item-menu">
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
                  <div className="header-button-item js-sidebar-btn">
                    <img src="images/dashboard/agent_db_1.jpg" alt="..." />
                    <span>
                      Tony <i className="ion-arrow-down-b"></i>
                    </span>
                  </div>
                  <div className="setting-menu js-right-sidebar d-none d-lg-block">
                    <div className="account-dropdown__body">
                      <div className="account-dropdown__item">
                        <Link to={"/add-property"}>Đăng Ký Token</Link>
                      </div>
                      <div className="account-dropdown__item">
                        <Link to={"/add-property"}>Trang Cá Nhân</Link>
                      </div>
                      <div className="account-dropdown__item">
                        <a href="db-my-profile.html">Đăng Xuất</a>
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
