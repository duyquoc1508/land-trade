import React from "react";
import PropTypes from "prop-types";

const ImagePreview = ({ imagefile }) =>
  imagefile.map(({ name, preview, size }, index) => (
    <div key={index} className="render-preview">
      <div className="image-container">
        <img src={preview} alt={name} />
      </div>
    </div>
  ));

ImagePreview.propTypes = {
  imagefile: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.file,
      name: PropTypes.string,
      preview: PropTypes.string,
      size: PropTypes.number,
    })
  ),
};

export default ImagePreview;
