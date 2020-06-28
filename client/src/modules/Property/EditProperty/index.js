import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { loadScript } from "../../../helper/utils";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Cookie from "../../../helper/cookie";
import ImagePreview from "../../../components/ImagePreview/imagePreview";
import PopupNotification from "../../../components/PopupNotification";
import PropertyStandard from "../PropertyStandard";

export class EditProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: [],
      galleries: [],
      title: "",
      price: 0,
      description: "",
      areaFloor: 0,
      numOfBedrooms: 0,
      numOfBathrooms: 0,
      utilities: [],
    };
    // this.handleCheckbox = this.handleCheckbox.bind(this);
  }
  async componentDidMount() {
    let response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL_API}/certification/${this.props.match.params.hash}`,
    });
    // console.log(response);
    let property = response.data.data;

    let imgResBlob = await Promise.all(
      property.moreInfo.galleries.map((item) =>
        fetch(
          `${process.env.REACT_APP_BASE_URL_IMAGE}/images/${item}`
        ).then((response) => response.blob())
      )
    );

    let previewImg = imgResBlob.map((item) =>
      Object.assign({}, { preview: URL.createObjectURL(item) })
    );
    this.setState({
      title: property.moreInfo.title || "",
      price: property.moreInfo.price,
      description: property.moreInfo.description,
      areaFloor: property.moreInfo.areaFloor,
      numOfBedrooms: property.moreInfo.numOfBedrooms,
      numOfBathrooms: property.moreInfo.numOfBathrooms,
      galleries: property.moreInfo.galleries,
      imageFiles: previewImg,
    });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL_API}/certification/edit/${this.props.match.params.hash}`,
      data: this.state,
      headers: {
        Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
      },
    });
    // if (response.status !== 200) {
    //   this.props.history.push(`/listings`);
    // } else {
    //   this.props.history.push(`/listings`);
    // }
  };
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleCheckbox(event) {
    if (event.target.checked) {
      this.setState({
        utilities: [...this.state.utilities, event.target.name],
      });
    } else {
      this.setState({
        utilities: this.state.utilities.filter(
          (item) => item !== event.target.name
        ),
      });
    }
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
    this.setState({ galleries: result.data.data, imageFiles: listImages });
    alert("anh dang upload thanh cong!");
  }

  render() {
    return (
      <Fragment>
        <PropertyStandard
          match={this.props.match}
          history={this.props.history}
        />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="db-add-list-wrap">
                  <div className="act-title">
                    <h5> Thông tin tổng quan :</h5>
                  </div>
                  <div className="db-add-listing">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>Tiêu đề</label>
                          <input
                            name="title"
                            component="input"
                            className="form-control filter-input"
                            placeholder="Nhập tiêu đề"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.title}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        {/* <div className="form-group" > */}
                        <label>Giá bán</label>
                        <div className="input-group">
                          <input
                            name="price"
                            component="input"
                            className="form-control filter-input"
                            placeholder="Nhập giá bán"
                            type="number"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.price}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text"> VND </span>
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Mô tả</label>
                          <textarea
                            name="description"
                            className="form-control"
                            id="list_info"
                            rows="4"
                            placeholder="Mô tả nội dung"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.description}
                          ></textarea>
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
                      <div className="col-md-4 ">
                        <label>Diện tích mặt sàn</label>
                        <div className="input-group">
                          <input
                            name="areaFloor"
                            component="input"
                            className="form-control filter-input"
                            placeholder="Diện tích mặt sàn"
                            type="number"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.areaFloor}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">
                              {" "}
                              m<sup>2</sup>{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Số phòng ngủ</label>
                          <input
                            name="numOfBedrooms"
                            component="input"
                            className="form-control filter-input"
                            placeholder="Số phòng ngủ"
                            type="number"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.numOfBedrooms}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Số phòng tắm</label>
                          <input
                            name="numOfBathrooms"
                            component="input"
                            className="form-control filter-input"
                            placeholder="Số phòng tắm"
                            type="number"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.numOfBathrooms}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="act-title">
                  <h5>Tiện ích :</h5>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="filter-checkbox">
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={this.state.checkedB}
                            onChange={(e) => this.handleCheckbox(e)}
                            name="Bể bơi"
                            color="primary"
                          />
                        }
                        label="Bể bơi"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={state.checkedB}
                            onChange={(e) => this.handleCheckbox(e)}
                            name="Sân chơi thể thao"
                            color="primary"
                          />
                        }
                        label="Sân chơi thể thao"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={state.checkedB}
                            onChange={(e) => this.handleCheckbox(e)}
                            name="Khu BBQ"
                            color="primary"
                          />
                        }
                        label="Khu BBQ"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={state.checkedB}
                            onChange={(e) => this.handleCheckbox(e)}
                            name="Sân tenis"
                            color="primary"
                          />
                        }
                        label="Sân tenis"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={state.checkedB}
                            onChange={(e) => this.handleCheckbox(e)}
                            name="Chỗ đậu xe ô tô"
                            color="primary"
                          />
                        }
                        label="Chỗ đậu xe ô tô"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={state.checkedB}
                            onChange={(e) => this.handleCheckbox(e)}
                            name="Ban công"
                            color="primary"
                          />
                        }
                        label="Ban công"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={state.checkedB}
                            onChange={(e) => this.handleCheckbox(e)}
                            name="Vườn cây cảnh"
                            color="primary"
                          />
                        }
                        label="Vườn cây cảnh"
                      />
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
                            {this.state.imageFiles &&
                            this.state.imageFiles.length > 0 ? (
                              <div className="preview-container">
                                <ImagePreview
                                  imagefile={this.state.imageFiles}
                                />
                              </div>
                            ) : (
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
                            )}
                          </div>
                        </div>
                        <div className="add-btn">
                          <button
                            className="btn v3"
                            onClick={() =>
                              this.setState({
                                imageFiles: [],
                                galleries: [],
                              })
                            }
                          >
                            Xóa ảnh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="db-add-list-wrap">
                  <div className="db-add-listing">
                    <div className="row">
                      <div className="col-md-12 text-right sm-left">
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

const mapStateToProps = (state) => {
  return {
    properties: state.myListing.properties.filter(
      (property) => property.state === 2
    ),
  };
};

export default connect(mapStateToProps, null)(EditProperty);
