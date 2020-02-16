import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ButtonLogin from "../../pages/Login";
import { connect } from "react-redux";
// import Cookie from "../../helper/cookie";

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
  render() {
    // let checkAuth = Cookie.getCookie("accessToken");
    console.log(this.props.checkAuth);
    return (
      <header className="header">
        <div className="site-navbar-wrap v1">
          <div className="container">
            <div className="site-navbar">
              <div className="row align-items-center">
                <div className="col-lg-2 col-md-6 col-9 order-2 order-xl-1 order-lg-1 order-md-1">
                  <a className="navbar-brand" href="index.html">
                    <img
                      src="images/logo-white.png"
                      alt="logo"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="col-lg-10 col-md-6 col-3  order-3 order-xl-2 order-lg-2 order-md-3 pl-xs-0">
                  <nav className="site-navigation text-right">
                    <div className="container">
                      <ul className="site-menu js-clone-nav d-none d-lg-block">
                        {this.showMenus(menus)}
                        {/* <li>{this.state.checkAuth}</li> */}
                        {!this.props.checkAuth ? (
                          <ButtonLogin />
                        ) : (
                          <li className="">
                            <button className="btn v3">
                              <i className="lnr lnr-home"></i>
                              Đăng tin{" "}
                            </button>
                          </li>
                        )}
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
                  <div className=""></div>
                </div>
              </div>
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
