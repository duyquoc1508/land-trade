import React, { useState } from "react";
import { fetchNotificationsRequest } from "./action";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import formatDate from "../../../utils/formatDate";

function Notifications(props) {
  const [toggleNotifications, setToggleNotifications] = useState(
    "header-button-item has-noti js-item-menu"
  );
  const [toggleNotificationsStatus, setToggleNotificationsStatus] = useState(
    false
  );
  const changeToggleNotifications = () => {
    if (!toggleNotificationsStatus) {
      setToggleNotificationsStatus(true);
      setToggleNotifications(
        "header-button-item has-noti js-item-menu show-dropdown"
      );
      props.fetchNotifications();
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
        {props.notifications.length === 0 ? (
          <div className="notifi__item">
            <div className="content">
              <p>Bạn chưa có thông báo nào</p>
            </div>
          </div>
        ) : (
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
