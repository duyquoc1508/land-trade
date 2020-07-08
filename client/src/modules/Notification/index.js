import React, { Component } from "react";
import formatDate from "../../utils/formatDate";
import axios from "axios";
import Cookie from "../../helper/cookie";

export default class Notification extends Component {
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
                  <div className="au-message__item unread" key={index}>
                    <div
                      className="au-message__item-inner"
                      onClick={() => this.props.history.push(notification.url)}
                    >
                      <div className="au-message__item-text">
                        <h5 className="name">Sarah Conor</h5>
                        <p>
                          <p>{notification.message}</p>
                        </p>
                      </div>
                      <div className="au-message__item-time">
                        <span>{formatDate(notification.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {this.state.data.length > 7 && (
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
