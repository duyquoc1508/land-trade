import React, { useEffect, useState } from "react";
import { fetchNotificationsRequest } from "./action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import formatDate from "../../../utils/formatDate";

function Notifications(props) {
  const [toggleNotifications, setToggleNotifications] = useState(
    "header-button-item has-noti js-item-menu"
  );
  const [toggleNotificationsStatus, setToggleNotificationsStatus] = useState(
    true
  );
  const changeToggleNotifications = () => {
    if (!toggleNotificationsStatus) {
      setToggleNotificationsStatus(true);
      setToggleNotifications(
        "header-button-item has-noti js-item-menu show-dropdown"
      );
      if (props.notifications.length === 0) props.fetchNotifications();
    } else {
      setToggleNotificationsStatus(false);
      setToggleNotifications("header-button-item has-noti js-item-menu");
    }
  };

  const history = useHistory();
  return (
    <div className={toggleNotifications} onClick={changeToggleNotifications}>
      <i className="ion-ios-bell-outline"></i>
      <div className="notifi-dropdown js-dropdown">
        {props.notifications.length > 0 &&
          props.notifications.map((notification, index) => (
            <div
              className="notifi__item"
              key={index}
              onClick={() => history.push(notification.url)}
            >
              <div className="content">
                <p>{notification.message}</p>
                <span className="date">
                  {formatDate(notification.createdAt)}
                </span>
              </div>
            </div>
          ))}

        <div className="notify-bottom text-center py-20">
          <a href="#">Xem tất cả thông báo</a>
        </div>

        {/* <div className="notifi__item">
          <div className="content">
            <p>
              Your Property <b>Villa On Hartford</b> has been approved!
            </p>
            <span className="date">5 min ago</span>
          </div>
        </div>
        <div className="notifi__item">
          <div className="content">
            <p>You have 3 unread Messages</p>
            <span className="date">5 min ago</span>
          </div>
        </div>*/}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
