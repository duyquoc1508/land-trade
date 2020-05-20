import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ButtonLogin from "../../modules/Login";
import { connect } from "react-redux";
import Cookie from "../../helper/cookie";
import Notifications from "./Notifications";
import PopupNotification from "../PopupNotification";

const menus = [
  {
    name: "Trang Chủ",
    to: "/",
    exact: true,
  },
  {
    name: "Mua Bán",
    to: "/listings",
    exact: false,
  },
  {
    name: "Giao dịch",
    to: "/transaction",
    exact: true,
  },
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
      toggleNotification: false,
      messageNotification: "",
    };
  }
  componentDidUpdate(preProps, preState) {
    const { socket } = this.props;
    if (socket && socket != preProps.socket) {
      console.log(
        "Menu -> componentDidUpdate -> listening event new certification"
      );
      // listener event new certification
      socket.on("new certification", (message) => {
        this.setState({
          toggleNotification: true,
          messageNotification: message,
        });
        setTimeout(() => {
          this.setState({ toggleNotification: false });
        }, 3000);
      });
    }
  }

  // setupConnectSocket(publicAddress) {
  //   console.log(publicAddress);
  //   const socket = io(process.env.REACT_APP_BASE_URL_SOCKET);
  //   socket.emit("user connected", publicAddress);
  // socket.on("notifications", () => {
  //   this.setState({ toggleNotification: true });
  //   setTimeout(() => {
  //     this.setState({ toggleNotification: false });
  //   }, 3000);
  // });
  // }

  changeToggleAuth = () => {
    if (!this.state.toggleAuthStatus) {
      // console.log("show");
      this.setState({ toggleAuthStatus: true });
      this.setState({
        toggleAuth:
          "setting-menu js-right-sidebar d-none d-lg-block show-sidebar",
      });
    } else {
      // console.log("close");
      this.setState({ toggleAuthStatus: false });
      this.setState({
        toggleAuth: "setting-menu js-right-sidebar d-none d-lg-block",
      });
    }
  };
  render() {
    return (
      <header className="db-top-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-1 col-sm-3 col-3">
              <Link className="navbar-brand" to={"/"}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/images/logo.jpg`}
                  alt="logo"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-md-8 col-sm-3 col-1">
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
            <div className="col-md-3 col-sm-6 col-7">
              {!!this.props.checkAuth ? (
                <div className="header-button">
                  <Notifications />
                  <div
                    className="header-button-item js-sidebar-btn"
                    onClick={this.changeToggleAuth}
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/images/dashboard/agent_db_1.jpg`}
                      alt="..."
                    />
                    <span>
                      {this.props.user.fullName || "Guest"}{" "}
                      <i className="ion-arrow-down-b"></i>
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
                        <Link
                          to={"/user/my-properties"}
                          onClick={this.changeToggleAuth}
                        >
                          Danh sách tài sản
                        </Link>
                      </div>
                      <div className="account-dropdown__item">
                        <a
                          type="button"
                          onClick={() => {
                            console.log("click logout");
                            Cookie.setCookie("accessToken", "", 0);
                            localStorage.removeItem("user");
                          }}
                          href="/"
                        >
                          Đăng xuất
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ButtonLogin />
              )}
            </div>
          </div>
        </div>
        {this.state.toggleNotification && (
          <PopupNotification message={this.state.messageNotification} />
        )}
      </header>
    );
  }

  showMenus = (menus) => {
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

const mapStateToProps = (state) => {
  return {
    checkAuth: state.login.accessToken,
    user: state.user,
    socket: state.login.socket,
  };
};

export default connect(mapStateToProps)(Menu);
