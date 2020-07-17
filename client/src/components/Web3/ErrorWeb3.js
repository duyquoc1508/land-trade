import React from "react";
import IconNoWeb3 from "./IconNoWeb3";
import InstallMetaMask from "./InstallMetamask";
import "./errorWeb3.css";

const ErrorWeb3 = () => (
  <div className="Web3Provider-container">
    <div className="Web3Provider-wrapper box-shadow">
      <div className="Web3Provider-image">
        <IconNoWeb3 />
      </div>
      <h1 className="Web3Provider-title text-shadow-simple">Web3 Not Found</h1>
      {/* dangerouslySetInnerHTML={{ __html:  }} */}

      <p className="Web3Provider-message">
        Có vẻ như bạn đang sử dụng trình duyệt không có có sẵn Web3. Vui lòng
        đảm bảo rằng bạn đang sử dụng trình duyệt có tích hợp Web3 như{" "}
        <a href="https://brave.com/">Brave</a> hoặc Parity. Nếu bạn đang sử dụng
        tiện ích mở rộng MetaMask hoặc Parity trên trình duyệt, hãy đảm bảo rằng
        nó đã được bật.
      </p>
    </div>
    <InstallMetaMask />
  </div>
);

export default ErrorWeb3;
