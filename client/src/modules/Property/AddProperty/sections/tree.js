import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class TreeForm extends Component {
  // componentDidMount() {}
  getValue(data) {
    console.log(data);
  }
  render() {
    const { handleSubmit } = this.props;
    // console.log(handleClick);
    return (
      <div>
        <form onSubmit={handleSubmit(this.getValue)}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Cây trồng lâu năm</label>
                <Field
                  name="perennialTree"
                  component="textarea"
                  className="form-control"
                  rows="4"
                  placeholder=""
                  autoFocus={true}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

TreeForm = reduxForm({
  // a unique name for the form
  form: "tree",
})(TreeForm);

export default TreeForm;
