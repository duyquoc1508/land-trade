import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import { loadScript } from "../../../helper/utils";
import DropZoneField from "../../../components/DropzoneField/dropzoneField";

const imageIsRequired = (value) => (!value ? "Required" : undefined);

export class EditProperty extends Component {
  constructor(props) {
    super(props);
    this.state = { imageFiles: [] };
  }
  componentDidMount() {
    loadScript("js/plugin.js");
    console.log("load main");
    loadScript("js/main.js");
  }
  handleSubmit(e) {
    console.log(e);
    alert("submit");
  }
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
  render() {
    let { id } = this.props.match.params;
    console.log(id);
    return (
      <div className="container mt-75">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="db-add-list-wrap">
                <div className="act-title">
                  <h5> Thông tin tổng quan :</h5>
                </div>
                <div className="db-add-listing">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Tiêu đề</label>
                        <Field
                          name="title"
                          component="input"
                          className="form-control filter-input"
                          placeholder="Sea View Apartment"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Giá bán</label>
                        <Field
                          name="price"
                          component="input"
                          className="form-control filter-input"
                          placeholder="Sea View Apartment"
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Mô tả</label>
                        <Field
                          name="description"
                          component="textarea"
                          className="form-control"
                          id="list_info"
                          rows="4"
                          placeholder="Enter your text here"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="db-add-list-wrap">
                <div className="act-title">
                  <h5>Thông tin chi tiết :</h5>
                </div>
                <div className="db-add-listing">
                  <div className="row mb-30">
                    <div className="col-md-4">
                      <label>Diện tích mặt sàn</label>
                      <Field
                        name="areaFloor"
                        component="input"
                        className="form-control filter-input"
                        placeholder="Sea View Apartment"
                        type="number"
                      />
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Số phòng ngủ</label>
                        <Field
                          name="no_room_bed"
                          component="input"
                          className="form-control filter-input"
                          placeholder="Sea View Apartment"
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Số phòng tắm</label>
                        <Field
                          name="no_room_bath"
                          component="input"
                          className="form-control filter-input"
                          placeholder="Sea View Apartment"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="db-add-list-wrap">
                <div className="act-title">
                  <h5>Thư viện hình ảnh :</h5>
                </div>
                <div className="db-add-listing">
                  <div className="row">
                    <div className="col-md-12 mb-5">
                      <div className="form-group">
                        <div className="form-group">
                          <div className="add-listing__input-file-box">
                            <Field
                              name="images"
                              component={DropZoneField}
                              type="file"
                              imagefile={this.state.imageFiles}
                              handleOnDrop={this.handleOnDrop}
                              validate={[imageIsRequired]}
                            />
                            <div className="add-listing__input-file-wrap">
                              <i className="lnr lnr-cloud-upload"></i>
                              <p>Click here to upload your images</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="add-btn">
                        <a href="#" className="btn v3">
                          Add Images
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="db-add-list-wrap">
                <div className="db-add-listing">
                  <div className="row">
                    <div className="col-md-12 text-right sm-left">
                      <button className="btn v3 mr-5" type="submit">
                        Preview
                      </button>
                      <button className="btn v3" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const EditPropertyForm = reduxForm({
  // a unique name for the form
  form: "editProperty",
})(EditProperty);

export default EditPropertyForm;
