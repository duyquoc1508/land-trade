/// proplem: Can't ignore value of field disabled before send request
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class HouseForm extends Component {
  getValue(data) {
    console.log(data);
  }
  constructor(props) {
    super(props);
    this.state = {
      houseType: 1,
    };
    this.houseType = {
      "Nhà chung cư": 0,
      "Nhà ở riêng lẻ": 1,
    };
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.getValue)}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Loại nhà ở</label>
              <Field
                name="houseType"
                component="select"
                className="form-control filter-input"
                onChange={(e) =>
                  this.setState({ houseType: this.houseType[e.target.value] })
                }
              >
                <option></option>
                <option value="Nhà ở riêng lẻ">Nhà ở riêng lẻ</option>
                <option value="Nhà chung cư">Nhà chung cư</option>
              </Field>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label>Địa chỉ</label>
              <Field
                name="address"
                component="input"
                type="text"
                className="form-control filter-input"
                placeholder="Địa chỉ hoặc tên nhà chung cư / tòa nhà"
              />
            </div>
          </div>

          {this.state.houseType ? (
            <div className="col-md-6">
              <div className="form-group">
                <label>Diện tích xây dựng</label>
                <div className="input-group">
                  <Field
                    name="constructionArea"
                    component="input"
                    type="number"
                    className="form-control filter-input"
                    placeholder="Diện tích xây dựng"
                    disabled={this.houseType[this.state.houseType]}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      {" "}
                      m<sup>2</sup>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="col-md-6">
            <div className="form-group">
              <label>Diện tích sàn</label>
              <div className="input-group">
                <Field
                  name="floorArea"
                  component="input"
                  type="number"
                  className="form-control filter-input"
                  placeholder="Diện tích sàn"
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    {" "}
                    m<sup>2</sup>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {this.state.houseType ? (
            <div className="col-md-6">
              <div className="form-group">
                <label>Cấp (Hạng)</label>
                <Field
                  name="level"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  placeholder="Cấp"
                />
              </div>
            </div>
          ) : null}

          {this.state.houseType ? (
            <div className="col-md-6">
              <div className="form-group">
                <label>Số tầng</label>
                <Field
                  name="numberOfFloor"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  placeholder="Số tầng, hầm và sân thượng"
                />
              </div>
            </div>
          ) : null}

          <div className="col-md-6">
            <div className="form-group">
              <label>Hình thức sở hữu</label>
              <Field
                name="formOfOwn"
                component="input"
                className="form-control filter-input"
                type="text"
                placeholder="Hình thức sở hữu"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Thời gian sở hữu</label>
              <Field
                name="timeOfOwn"
                component="input"
                className="form-control filter-input"
                type="text"
                placeholder="Thời gian sở hữu"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
HouseForm = reduxForm({
  // a unique name for the form
  form: "house",
})(HouseForm);

export default HouseForm;
