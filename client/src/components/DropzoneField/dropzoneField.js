import React from "react";
import DropZone from "react-dropzone";
import ImagePreview from "../ImagePreview/imagePreview";
import Placeholder from "../Placeholder/placeholder";
import ShowError from "../ShowError/showError";

const DropZoneField = ({
  handleOnDrop,
  input: { onChange },
  imagefile,
  meta: { error, touched },
}) => (
  <div className="preview-container">
    <DropZone
      accept="image/jpeg, image/png, image/gif, image/bmp"
      className="upload-container add-listing__input-file"
      onDrop={(file) => handleOnDrop(file, onChange)}
      multiple={true}
    >
      {(props) =>
        imagefile && imagefile.length > 0 ? (
          <ImagePreview imagefile={imagefile} />
        ) : (
          <Placeholder {...props} error={error} touched={touched} />
        )
      }
    </DropZone>
    <ShowError error={error} touched={touched} />
  </div>
);

export default DropZoneField;
