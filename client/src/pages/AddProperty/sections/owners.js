import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

class OwnersForm extends Component {
  getValue(data) {
    // console.log(data);
  }

  renderOwners = ({ fields, meta: { error, submitFailed } }) => (
    <div className="row form-group">
      <div className="col-md-12">
        {fields.map((owner, index) => (
          <div>
            <label className="col-md-12" key={index}>
              Địa chỉ của chủ sỡ hữu {index + 1}
            </label>
            <div className="col-md-12">
              <div className="input-group mb-3">
                <Field
                  name={`${owner}.publicAddress`}
                  key={index}
                  placeholder="Địa chỉ của chủ sỡ hữu"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button
                    type="button"
                    className="btn btn-danger btn-xs"
                    onClick={() => fields.splice(index, 1)}
                  >
                    <i class="fas fa-times"></i>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary btn-xs"
            onClick={() => fields.push({})}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
            {" Thêm người sở hữu"}
          </button>
          {/* {submitFailed && error && <span>{error}</span>} */}
        </div>
      </div>
    </div>
  );

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.getValue)}>
        <FieldArray name="owners" component={this.renderOwners} />
      </form>
    );
  }
}
OwnersForm = reduxForm({
  // a unique name for the form
  form: "owners"
})(OwnersForm);

export default OwnersForm;
