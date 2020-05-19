import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    let isLoading = this.props.isLoading || false;
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          style="margin: auto; background: rgb(241, 242, 243); display: block; shape-rendering: auto;"
          width="214px"
          height="214px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            r="22"
            stroke-width="3"
            stroke="#0055a5"
            stroke-dasharray="34.55751918948772 34.55751918948772"
            fill="none"
            stroke-linecap="round"
            transform="rotate(311.492 50 50)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="1.1904761904761905s"
              repeatCount="indefinite"
              keyTimes="0;1"
              values="0 50 50;360 50 50"
            ></animateTransform>
          </circle>
          <circle
            cx="50"
            cy="50"
            r="18"
            stroke-width="3"
            stroke="#45aee7"
            stroke-dasharray="28.274333882308138 28.274333882308138"
            stroke-dashoffset="28.274333882308138"
            fill="none"
            stroke-linecap="round"
            transform="rotate(-311.492 50 50)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="1.1904761904761905s"
              repeatCount="indefinite"
              keyTimes="0;1"
              values="0 50 50;-360 50 50"
            ></animateTransform>
          </circle>
        </svg>
      </div>
    );
  }
}
