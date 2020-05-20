import React, { Component } from "react";

// use <Loading isLoading={true} alert="Hello các bạn" />
export default class Loading extends Component {
  render() {
    let isLoading = this.props.isLoading || false;
    let alert = this.props.alert || "Vui lòng chờ ...";
    return (
      <div>
        {isLoading ? (
          <div>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 999999999999,
              }}
            ></div>
            <img
              src={`${process.env.REACT_APP_BASE_URL}/loading.png`}
              style={{
                position: "fixed",
                top: "calc(50% - 107px)",
                left: "calc(50% - 107px)",
                zIndex: 9999999999,
              }}
            />
            <h3
              style={{
                position: "fixed",
                top: "calc(50% + 107px)",
                left: "45%",
                zIndex: 2147483647,
                color: "#ffffff",
              }}
            >
              {alert}
            </h3>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
