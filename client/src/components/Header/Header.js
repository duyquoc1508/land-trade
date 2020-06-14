import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ButtonLogin from "../../modules/Login";
import { connect } from "react-redux";
import Cookie from "../../helper/cookie";
import Notifications from "./Notifications";
import PopupNotification from "../PopupNotification";
import io from "socket.io-client";
import { initSocket } from "./action";

const menus = [
  {
    name: "Trang Chủ",
    to: "/",
    exact: true,
    role: "all",
  },
  {
    name: "Mua Bán",
    to: "/listings",
    exact: false,
    role: "all",
  },
  {
    name: "Tra cứu",
    to: "/search",
    exact: false,
    role: "all",
  },
  {
    name: "Số hóa tài sản",
    to: "/add-property",
    exact: false,
    role: "Notary",
  },
  {
    name: "Giao dịch",
    to: "/add-property",
    exact: false,
    role: "Notary",
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

  // reconnect socket with server when component reaload
  componentDidMount() {
    const accessToken = Cookie.getCookie("accessToken");
    if (accessToken) {
      const socket = io(process.env.REACT_APP_BASE_URL_SOCKET);
      socket.emit("user-connected", accessToken);
      this.props.initSocket(socket);
    }
    // check role
  }

  // listener event from server
  componentDidUpdate(preProps, preState) {
    // logout after 1 day
    let expiredTime = Cookie.getCookie("expiredToken");
    if (expiredTime) {
      setTimeout(() => {
        this.logout();
      }, expiredTime - Date.now());
    }
    // create new connection if it doesn't exist'
    if (!this.props.socket) {
      const accessToken = Cookie.getCookie("accessToken");
      if (accessToken) {
        const socket = io(process.env.REACT_APP_BASE_URL_SOCKET);
        socket.emit("user-connected", accessToken);
        this.props.initSocket(socket);
      }
    }
    // listener event
    if (this.props.socket && this.props.socket !== preProps.socket) {
      // listen event new certification
      this.props.socket.on("new-certification", (message) => {
        this.setState({
          toggleNotification: true,
          messageNotification: message,
        });
        setTimeout(() => {
          this.setState({ toggleNotification: false });
        }, 5000);
      });

      // listen event transaction
      this.props.socket.on("new-transaction", (message) => {
        this.setState({
          toggleNotification: true,
          messageNotification: message,
        });
        setTimeout(() => {
          this.setState({ toggleNotification: false });
        }, 5000);
      });
    }
  }

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

  logout = () => {
    // e.preventDefault();
    Cookie.setCookie("accessToken", "", 0);
    Cookie.setCookie("expiredToken", "", 0);
    localStorage.removeItem("user");
    window.location.href = process.env.REACT_APP_BASE_URL;
  };

  render() {
    let { user } = this.props;
    return (
      <header className="db-top-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-1 col-sm-3 col-4">
              <Link className="navbar-brand" to={"/"}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/images/logo.jpg`}
                  alt="logo"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-md-8 col-sm-3 col-2">
              <div className="site-navbar-wrap v2 style2">
                <div className="site-navbar">
                  <nav className="site-navigation">
                    <div className="container">
                      <ul className="site-menu js-clone-nav d-none d-lg-block">
                        {this.showMenus(menus, user)}
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
                          to={"/user/profile"}
                          onClick={this.changeToggleAuth}
                        >
                          Trang cá nhân
                        </Link>
                      </div>
                      {user && user.role == "owner" ? (
                        <div className="account-dropdown__item">
                          <Link
                            to={"/my-properties"}
                            onClick={this.changeToggleAuth}
                          >
                            Tài sản của tôi
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="account-dropdown__item">
                        <a
                          type="button"
                          style={{ cursor: "pointer" }}
                          onClick={this.logout}
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

  showMenus = (menus, user) => {
    var result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        if (menu.role == "all" || menu.role == user.role) {
          return (
            <MenuLink
              key={index}
              label={menu.name}
              to={menu.to}
              activeOnlyWhenExact={menu.exact}
            />
          );
        }
      });
    }
    return result;
  };
}

const mapStateToProps = (state) => {
  return {
    checkAuth: state.login.accessToken,
    user: state.user.data,
    socket: state.header.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initSocket: (socket) => dispatch(initSocket(socket)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
