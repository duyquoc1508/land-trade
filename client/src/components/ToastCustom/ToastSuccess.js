import React, { Fragment } from "react";

const ToastSuccess = ({ message }) => {
  return (
    <Fragment>
      <span>
        <i className="ion-checkmark" style={{ padding: "5px 5px" }}></i>{" "}
        {message}
      </span>
    </Fragment>
  );
};

export default ToastSuccess;
