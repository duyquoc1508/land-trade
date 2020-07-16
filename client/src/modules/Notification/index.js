import React, { Component } from "react";
import formatDate from "../../utils/formatDate";
import axios from "axios";
import Cookie from "../../helper/cookie";
import { connect } from "react-redux";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = async () => {
    this.fetchNotificationsFromApi();
  };

  fetchNotificationsFromApi = async () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL_API}/notification`,
      headers: {
        Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
      },
      params: { page: 1, limit: 1010 },
    }).then((res) => this.setState({ data: res.data.data }));
  };

  readNotification = (idNotification) => {
    const url = `${process.env.REACT_APP_BASE_URL_API}/notification/${idNotification}`;
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
      },
    });
    this.props.readNotification();
  };
  render() {
    return (
      <div className="inbox-wrap col-sm-8 mt-75" style={{ margin: "auto" }}>
        <div className="act-title">
          <h5>Thông báo</h5>
        </div>
        <div className="au-inbox-wrap js-inbox-wrap">
          <div className="au-message js-list-load">
            <div className="au-message-list">
              {this.state.data.length === 0 ? (
                <div className="au-message__item unread">
                  <div className="au-message__item-inner">
                    <div className="au-message__item-text">
                      <p>Bạn chưa có thông báo nào</p>
                    </div>
                  </div>
                </div>
              ) : (
                this.state.data.map((notification, index) => (
                  <div
                    className={
                      "au-message__item " + (!notification.seen && "unread")
                    }
                    key={index}
                  >
                    <h1></h1>
                    <div
                      className="au-message__item-inner"
                      onClick={() => {
                        this.props.history.push(notification.url);
                        !notification.seen &&
                          this.readNotification(notification._id);
                      }}
                    >
                      <div className="au-message__item-text">
                        <h5 className="name" style={{ fontSize: "15px" }}>
                          {notification.message}
                        </h5>

                        {/* <p>{notification.message}</p> */}
                      </div>
                      <div className="au-message__item-time">
                        <span>{formatDate(notification.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {this.state.data.length > 10 && (
                <div className="au-message__footer">
                  <button className="btn v1">Xem thêm</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readNotification: () => dispatch({ type: "READ_NOTIFICATION" }),
  };
};

export default connect(null, mapDispatchToProps)(Notification);
