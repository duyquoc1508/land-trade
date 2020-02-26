import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

class OwnersForm extends Component {
  getValue(data) {
    // console.log(data);
  }

  renderOwners = ({ fields, meta: { error, submitFailed } }) => (
    <div className="row">
      <div className="col-md-12">
        <button
          type="button"
          className="btn btn-blue btn-xs"
          onClick={() => fields.push({})}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
          {" Thêm người sở hữu"}
        </button>
        {/* {submitFailed && error && <span>{error}</span>} */}
        <button
          type="button"
          className="btn btn-danger btn-xs"
          onClick={() => fields.pop({})}
        >
          Remove
        </button>
        <hr />
      </div>
      {fields.map((owner, index) => (
        <div className="col-md-12" key={index}>
          <div className="form-group">
            <label>Địa chỉ của chủ sỡ hữu {index + 1}</label>
            <Field
              placeholder="Địa chỉ của chủ sỡ hữu"
              name={owner}
              component="input"
              type="text"
              className="form-control filter-input"
              value=""
            />
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.getValue)}>
        <FieldArray name="publicAddress" component={this.renderOwners} />
      </form>
    );
  }
}
OwnersForm = reduxForm({
  // a unique name for the form
  form: "owners"
})(OwnersForm);

export default OwnersForm;
