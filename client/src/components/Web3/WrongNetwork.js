import React from "react";
import "./errorWeb3.css";

const WrongNetwork = () => {
  return (
    <div className="text-center">
      <div className="p-2 failed_color">
        <h5 className="text-center dark-blue-text"> Sai mạng blockchain!</h5>
        <div className="text-center dark-blue-text">
          Vui lòng chuyển sang mạng{" "}
          <strong>{process.env.REACT_APP_WEB3_PROVIDER}</strong> để sử dụng DAPP
        </div>
      </div>
    </div>
  );
};

export default WrongNetwork;
