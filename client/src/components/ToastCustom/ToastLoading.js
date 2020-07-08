import React, { Fragment } from "react";
import loading from "../../../public/loading.png";

const ToastLoading = ({ message }) => {
  return (
    <Fragment>
      <img
        alt="Loading..."
        src={loading}
        style={{ width: "50px", height: "50px" }}
      />
      <p style={{ display: "inline-block" }}>{message}</p>
    </Fragment>
  );
};

export default ToastLoading;
