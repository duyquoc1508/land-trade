import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "../../helper/cookie";
import ButtonLogin from "../../modules/Login";
import {
  initSocket,
  refreshPage,
  dispatchEventFromBlockchain,
  newNotification,
} from "./action";
import formatCurrency from "../../utils/formatCurrency";
import Notifications from "./Notifications";
import ErrorWeb3 from "../../components/Web3/ErrorWeb3";
import WrongNetWork from "../../components/Web3/WrongNetwork";
import { activateCertificateSuccess } from "../../modules/Property/ConfirmProperty/action";
import { createSuccess } from "../../modules/Property/AddProperty/actions";
import { initTransactionSuccess } from "../../modules/InitTransaction/action";

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
    to: "/investing",
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
    name: "Quản lý người dùng",
    to: "/management-user",
    exact: false,
    role: "Notary",
  },
  {
    name: "Danh sách tài sản",
    to: "/certification",
    exact: false,
    role: "Notary",
  },
  {
    name: "Quản lý tài khoản",
    to: "/role",
    exact: false,
    role: "Super Admin",
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
      isWrongNetwork: false,
    };
  }

  // handler refresh header => reconnect socket
  componentDidMount() {
    const accessToken = Cookie.getCookie("accessToken");
    if (accessToken) {
      const socket = window.io(process.env.REACT_APP_BASE_URL_SOCKET, {
        transports: ["websocket"],
      });
      socket.emit("user-connected", accessToken);
      this.props.initSocket(socket);
      this.props.refreshPage();
    }
  }

  // listener event from server
  componentDidUpdate = async (preProps, preState) => {
    // logout after 1 day
    let expiredTime = Cookie.getCookie("expiredToken");
    if (expiredTime) {
      setTimeout(() => {
        this.logout();
      }, expiredTime - Date.now());
    }
    // create new connection socket if it doesn't exist' (login)
    if (!this.props.socket) {
      const accessToken = Cookie.getCookie("accessToken");
      if (accessToken) {
        const socket = window.io(process.env.REACT_APP_BASE_URL_SOCKET, {
          transports: ["websocket"],
        });
        socket.emit("user-connected", accessToken);
        this.props.initSocket(socket);
        this.props.refreshPage();
      }
    }
    // handle event socket
    if (this.props.socket && this.props.socket !== preProps.socket) {
      const { history } = this.props;
      const socketEventToAction = {
        create_cert_success: "",
        activate_cert: "",
        new_certification: "",
        new_transaction: "",
        create_transaction_success: "",
        deposit_confirmed: "ACCEPT_TRANSACTION_SUCCESS",
        payment_request: "PAYMENT_SUCCESS",
        payment_confirmed: "CONFIRM_TRANSACTION_SUCCESS",
        transaction_canceled: "CANCEL_TRANSACTION_SUCCESS",
      };
      Object.keys(socketEventToAction).map((eventName) => {
        this.props.socket.on(eventName, (data) => {
          //event activate cert success
          if (eventName == "activate_cert") {
            setTimeout(() => {
              this.props.activateCertSuccess({
                history: history,
                txHash: data,
              });
            }, 500);
          } else if (eventName == "create_cert_success") {
            // event create new cert success
            setTimeout(() => {
              this.props.createCertSuccess({
                history: history,
                txHash: data,
              });
            }, 500);
          } else if (eventName == "create_transaction_success") {
            // event create new cert success
            setTimeout(() => {
              this.props.createTransactionSuccess({
                history: history,
                txHash: data,
              });
            }, 500);
          } else {
            // listener socket event info
            this.props.newNotification(); // fetch notification
            toast.info(`${data.message}`, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: false,
              onClick: () => history.push(data.url),
            });
          }
        });
      });
      this.props.socket.on("transaction_change_state", (data) => {
        // setTimeout(() => {
        this.props.dispatchEventFromBlockchain(
          socketEventToAction[data.event],
          data.txHash
        );
        // }, 1000);
      });
    }

    if (this.props.web3 && this.props.web3 != preProps.web3) {
      // only check user logged
      const networkId = await this.props.web3.eth.net.getId();
      networkId != process.env.REACT_APP_NETWORK_ID &&
        this.setState({ isWrongNetwork: true });
    }
  };

  changeToggleAuth = () => {
    if (!this.state.toggleAuthStatus) {
      this.setState({ toggleAuthStatus: true });
      this.setState({
        toggleAuth:
          "setting-menu js-right-sidebar d-none d-lg-block show-sidebar",
      });
    } else {
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
    const web3 = window.web3;
    let { user } = this.props;
    return !web3 ? (
      <ErrorWeb3 />
    ) : (
      <header className="db-top-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-2 ">
              <div className="navbar-brand">
                <Link to={"/"}>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/images/logo.jpg`}
                    alt="logo"
                    className="img-fluid"
                  />
                </Link>
              </div>
            </div>
            <div className="col-md-8 col-sm-4 col-2">
              <div className="site-navbar-wrap v2 style2">
                <div className="site-navbar">
                  <nav className="site-navigation">
                    <div className="container">
                      <ul className="site-menu js-clone-nav d-none d-lg-block">
                        {this.showMenus(menus, user)}
                      </ul>
                    </div>
                  </nav>
                  <div className="d-lg-none ">
                    {" "}
                    {/* sm-right */}
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
            <div className="col-md-2 col-sm-8 col-10">
              {!!this.props.checkAuth ? (
                <div className="header-button">
                  <Notifications history={this.props.history} />
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
                        <a type="button">
                          {formatCurrency(
                            Math.floor(
                              this.props.balance * this.props.ethToVndPrice
                            )
                          )}{" "}
                          VND
                        </a>
                      </div>
                      <div className="account-dropdown__item">
                        <Link
                          to={"/user/profile"}
                          onClick={this.changeToggleAuth}
                        >
                          Trang cá nhân
                        </Link>
                      </div>
                      {user && user.role == "owner" ? (
                        <div>
                          <div className="account-dropdown__item">
                            <Link
                              to={"/my-properties"}
                              onClick={this.changeToggleAuth}
                            >
                              Tài sản của tôi
                            </Link>
                          </div>
                          <div className="account-dropdown__item">
                            <Link
                              to={"/my-transactions"}
                              onClick={this.changeToggleAuth}
                            >
                              Giao dịch của tôi
                            </Link>
                          </div>
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
        {/* {this.state.toggleNotification && (
          <PopupNotification message={this.state.messageNotification} />
        )} */}
        <ToastContainer />
        {this.state.isWrongNetwork && <WrongNetWork />}
      </header>
    );
  }

  showMenus = (menus, user) => {
    var result = null;
    if (user && user.role === "Super Admin") {
      let menu = menus.find((item) => item.role === "Super Admin");
      return (
        <MenuLink
          label={menu.name}
          to={menu.to}
          activeOnlyWhenExact={menu.exact}
        />
      );
    }
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        if (menu.role == "all" || (user && menu.role == user.role)) {
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
    balance: state.shared.accountBalance,
    ethToVndPrice: state.shared.ethToVndPrice,
    web3: state.shared.web3,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initSocket: (socket) => dispatch(initSocket(socket)),
    refreshPage: () => dispatch(refreshPage()),
    dispatchEventFromBlockchain: (eventName, txHash) =>
      dispatch(dispatchEventFromBlockchain(eventName, txHash)),
    newNotification: () => dispatch(newNotification()),
    activateCertSuccess: (data) => {
      dispatch(activateCertificateSuccess(data));
    },
    createCertSuccess: (data) => {
      dispatch(createSuccess(data));
    },
    createTransactionSuccess: (data) => {
      dispatch(initTransactionSuccess(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
