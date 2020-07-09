import React, { useState, useEffect } from "react";
import { fetchNotificationsRequest, readNotification } from "./action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import formatDate from "../../../utils/formatDate";
import Cookie from "../../../helper/cookie";

function Notifications(props) {
  const [toggleNotifications, setToggleNotifications] = useState(
    "header-button-item js-item-menu"
  );
  const [toggleNotificationsStatus, setToggleNotificationsStatus] = useState(
    false
  );
  const changeToggleNotifications = () => {
    const hasNotify =
      (props.notifications.some((item) => !item.seen) && "has-noti") || "";
    if (toggleNotificationsStatus === false) {
      setToggleNotifications(
        "header-button-item js-item-menu show-dropdown " + hasNotify
      );
    } else {
      setToggleNotifications("header-button-item js-item-menu " + hasNotify);
    }
    setToggleNotificationsStatus(!toggleNotificationsStatus);
  };

  useEffect(() => {
    const hasNotify =
      (props.notifications.some((item) => !item.seen) && "has-noti") || "";
    setToggleNotifications("header-button-item js-item-menu " + hasNotify);
  }, [props.notifications]);

  const readNotification = (idNotification) => {
    const url = `${process.env.REACT_APP_BASE_URL_API}/notification/${idNotification}`;
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
      },
    });
    props.readNotification();
  };

  return (
    <div
      className={toggleNotifications}
      onClick={() => changeToggleNotifications()}
    >
      <i className="ion-ios-bell-outline"></i>
      <div className="notifi-dropdown js-dropdown">
        {props.notifications.length === 0 ? (
          <div className="notifi__item">
            <div className="content">
              <p>Bạn chưa có thông báo nào</p>
            </div>
          </div>
        ) : (
          props.notifications.map((notification, index) => (
            <div
              className={"notifi__item " + (!notification.seen && "unread")}
              key={index}
              onClick={() => {
                props.history.push(notification.url);
                !notification.seen && readNotification(notification._id);
              }}
            >
              <div className="content">
                <p>{notification.message}</p>
                <span className="date">
                  {formatDate(notification.createdAt)}
                </span>
              </div>
            </div>
          ))
        )}
        {props.notifications.length > 0 && (
          <div className="notify-bottom text-center py-20">
            <Link to={"/notification"}>Xem tất cả thông báo</Link>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotifications: () => dispatch(fetchNotificationsRequest()),
    readNotification: () => dispatch(readNotification()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
