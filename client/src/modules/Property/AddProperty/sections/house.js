import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class HouseForm extends Component {
  getValue(data) {
    console.log(data);
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.getValue)}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Địa chỉ </label>
              <Field
                name="address"
                component="input"
                type="text"
                className="form-control filter-input"
                placeholder="Địa chỉ"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Loại nhà ở</label>
              <Field
                name="houseType"
                component="input"
                type="text"
                className="form-control filter-input"
                placeholder="Lọai nhà ở"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>
                Diện tích xây dựng( đơn vị: m <sup>2</sup> )
              </label>
              <Field
                name="constructionArea"
                component="input"
                type="text"
                className="form-control filter-input"
                placeholder="Diện tích xây dựng"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>
                Diện tích sàn( đơn vị: m <sup>2</sup> )
              </label>
              <Field
                name="floorArea"
                component="input"
                type="text"
                className="form-control filter-input"
                placeholder="Diện tích sàn"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Tên Chung cư</label>
              <Field
                name="apartmentName"
                component="input"
                type="text"
                className="form-control filter-input"
                placeholder="Tên chung cư/tòa nhà"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>Hình thức sử hữu</label>
              <Field
                name="formOfOwn"
                component="input"
                type="text"
                className="form-control filter-input"
                placeholder="Hình thức sử hữu"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Thời gian sử dụng</label>
              <Field
                name="timeOfUse"
                component="input"
                className="form-control filter-input"
                type="text"
                placeholder="Thời gian sử dụng"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Hạng mục </label>
              <Field
                name="level"
                component="input"
                type="text"
                className="form-control filter-input"
                placeholder="Hạng mục nhà"
              />
            </div>
          </div>
          {/* <div className="col-md-12">
            <div className="form-group">
              <label>Nguồn gốc sử dụng</label>
              <textarea
                className="form-control"
                id="list_info"
                rows="4"
                placeholder="Nguồn gốc sử dụng"
              ></textarea>
            </div>
          </div> */}
        </div>
      </form>
    );
  }
}
HouseForm = reduxForm({
  // a unique name for the form
  form: "house"
})(HouseForm);

export default HouseForm;
