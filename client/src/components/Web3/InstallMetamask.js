import React from "react";
import "./errorWeb3.css";

const InstallMetaMask = () => (
  <div className="meta-mask-img">
    <a href="https://metamask.io/">
      <img
        className="meta-mask-img"
        src={require("../../../public/metamask.png")}
      />
    </a>
  </div>
);

export default InstallMetaMask;
