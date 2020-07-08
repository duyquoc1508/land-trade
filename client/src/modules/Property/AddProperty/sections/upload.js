import React, { Component } from "react";
// import { connect } from "react-redux";
import axios from "axios";
import { Form, Field, reduxForm } from "redux-form";
import DropZoneField from "../../../../components/DropzoneField/dropzoneField";

const imageIsRequired = (value) => (!value ? "Required" : undefined);

class UploadForm extends Component {
  state = { imageFiles: [] };

  handleFormSubmit = (formProps) => {
    console.log(formProps);
  };

  handleOnDrop = async (newImageFiles, onChange) => {
    const fd = new FormData();

    newImageFiles.forEach((item) => {
      fd.append("images", item);
    });
    let result = await axios.post(
      `${process.env.REACT_APP_BASE_URL_API}/upload/image`,
      fd
    );
    let listImages = newImageFiles.map((imageFile) => {
      return {
        name: imageFile.name,
        size: imageFile.size,
        preview: URL.createObjectURL(imageFile),
      };
    });

    this.setState({ imageFiles: listImages }, () => onChange(result.data.data));
  };

  resetForm = () => this.setState({ imageFiles: [] }, () => this.props.reset());

  render = () => (
    <div className="">
      <h4>
        <i className="lnr lnr-picture"></i> Sơ đồ thử đất :
      </h4>
      <button
        type="button"
        className="btn btn-danger btn-xs"
        disabled={this.props.pristine || this.props.submitting}
        onClick={this.resetForm}
      >
        Xóa
      </button>
      <hr />
      <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
        <Field
          name="images"
          component={DropZoneField}
          type="file"
          imagefile={this.state.imageFiles}
          handleOnDrop={this.handleOnDrop}
          validate={[imageIsRequired]}
        />
      </Form>
      <div className="clear" />
    </div>
  );
}

UploadForm = reduxForm({
  // a unique name for the form
  form: "upload",
})(UploadForm);

export default UploadForm;
