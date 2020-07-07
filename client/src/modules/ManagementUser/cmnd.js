import React, { Component, Fragment } from "react";
import axios from "axios";
import { loadScript } from "../../helper/utils";
import ImagePreview from "../../components/ImagePreview/imagePreview";
import Cookie from "../../helper/cookie";

export class CMND extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: [],
      imageName: [],
    };
    // this.handleCheckbox = this.handleCheckbox.bind(this);
  }
  componentDidMount() {
    loadScript(`${process.env.REACT_APP_BASE_URL}/js/plugin.js`);
    loadScript(`${process.env.REACT_APP_BASE_URL}/js/main.js`);
  }

  nextStep() {
    return this.getStep() + 1;
  }

  getStep() {
    return Number(new URLSearchParams(location.search).get("step")) || 0;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // alert(this.imageName)
      let response = await axios({
        method: "put",
        url: `${process.env.REACT_APP_BASE_URL_API}/users`,
        data: { imageIdNumber: this.state.imageName },
        headers: {
          Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
        },
      });
      // alert(JSON.stringify(response))
      window.location.href = `/verify-account?step=${this.nextStep()}`;
    } catch (error) {
      alert(error);
    }
  };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOnDrop(e) {
    this.setState({
      imageFiles: e.target.files,
    });
  }

  async handleUpload(event) {
    const fd = new FormData();
    let newImageFiles = document.querySelector("input[type=file]").files;
    newImageFiles = Object.values(newImageFiles);
    newImageFiles.forEach((item) => {
      fd.append("images", item);
    });
    let result = await axios.post(
      `${process.env.REACT_APP_BASE_URL_API}/upload/idNumber`,
      fd
    );
    let listImages = newImageFiles.map((imageFile) => {
      return {
        name: imageFile.name,
        size: imageFile.size,
        preview: URL.createObjectURL(imageFile),
      };
    });
    this.setState({ imageName: result.data.data, imageFiles: listImages });
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="db-add-list-wrap">
                  <div className="act-title">
                    <h5>CMND :</h5>
                  </div>
                  <div className="db-add-listing">
                    <div className="row">
                      <div className="col-md-12 mb-5">
                        <div className="form-group">
                          <div className="form-group">
                            <div className="preview-container">
                              {this.state.imageFiles &&
                              this.state.imageFiles.length > 0 ? (
                                <ImagePreview
                                  imagefile={this.state.imageFiles}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                            {this.state.imageFiles &&
                            this.state.imageFiles.length == 0 ? (
                              <div className="add-listing__input-file-box">
                                <input
                                  name="images"
                                  type="file"
                                  className="upload-container add-listing__input-file"
                                  multiple
                                  onChange={() => this.handleUpload()}
                                />
                                <div className="add-listing__input-file-wrap">
                                  <i className="lnr lnr-cloud-upload"></i>
                                  <p>Click here to upload your images</p>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {/* <div className="add-btn">
                        <a href="#" className="btn v3">
                          Thêm hình ảnh
                        </a>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="db-add-list-wrap">
                  <div className="db-add-listing">
                    <div className="row">
                      <div className="col-md-12 sm-left">
                        <button className="btn v3" type="submit">
                          Cập nhập
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default CMND;
