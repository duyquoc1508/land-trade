import React from "react";
import PropTypes from "prop-types";
import { MdCloudUpload } from "react-icons/md";

const Placeholder = ({ getInputProps, getRootProps, error, touched }) => (
  <div
    {...getRootProps()}
    className={`placeholder-preview ${error && touched ? "has-error" : ""}`}
  >
    <input {...getInputProps()} />
    <MdCloudUpload
      style={{ fontSize: 200, paddingTop: 50, paddingBottom: 50 }}
    />
    {/* <i className="lnr lnr-cloud-upload"></i> */}
    <p>Nhấp vào đây để tải lên ảnh.</p>
  </div>
);

Placeholder.propTypes = {
  error: PropTypes.string,
  getInputProps: PropTypes.func.isRequired,
  getRootProps: PropTypes.func.isRequired,
  touched: PropTypes.bool,
};

export default Placeholder;
