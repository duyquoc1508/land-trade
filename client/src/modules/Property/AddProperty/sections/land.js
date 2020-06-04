import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
// import { connect } from "react-redux";
// import actions from "../actions";

class LandForm extends Component {
  getValue(data) {
    console.log(data);
  }
  render() {
    const { handleSubmit } = this.props;
    // console.log(handleClick);
    return (
      <div>
        <form onSubmit={handleSubmit(this.getValue)}>
          <div className="row ">
            <div className="col-md-4">
              <div className="form-group">
                <label>Thửa đất số</label>
                <Field
                  type="number"
                  component="input"
                  className="form-control filter-input"
                  placeholder="Thửa đất số "
                  name="landLotNo"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Tờ bản đồ số </label>
                <Field
                  name="mapSheetNo"
                  type="text"
                  className="form-control filter-input"
                  placeholder="Tờ bản đồ số"
                  component="input"
                />
              </div>
            </div>
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
                <label>
                  Diện tích sử dụng chung
                </label>
                <div className="input-group">
                  <Field
                    name="commonUseArea"
                    component="input"
                    type="number"
                    className="form-control filter-input"
                    placeholder="Diện tích"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"> m<sup>2</sup> </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Diện tích sử dụng riêng
                </label>
                <div className="input-group">
                  <Field
                    name="privateUseArea"
                    component="input"
                    type="number"
                    className="form-control filter-input"
                    placeholder="Diện tích"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"> m<sup>2</sup> </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Thời gian sử dụng</label>
                <Field
                  name="timeOfUse"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  placeholder="Thời gian sử dụng"
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Mục đích sử dụng </label>
                <Field
                  name="purposeOfUse"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  placeholder="Mục đích sử dụng"
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Nguồn gốc sử dụng</label>
                <Field
                  name="originOfUse"
                  component="textarea"
                  className="form-control"
                  rows="4"
                  placeholder="Nguồn gốc sử dụng"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   addProperty: state.addProperty,
//   form: state.form
// });

// const mapDispatchToProps = dispatch => {
//   return {
//     handleClick: data => {
//       dispatch(actions.fillForm(data));
//     }
//   };
// };

// const connected = connect(mapStateToProps, mapDispatchToProps)(LandForm);

LandForm = reduxForm({
  // a unique name for the form
  form: "land"
})(LandForm);

export default LandForm;
