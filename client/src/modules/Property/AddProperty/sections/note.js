import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class NoteForm extends Component {
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
                <label>Ghi chú</label>
                <Field
                  name="notice"
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

NoteForm = reduxForm({
  // a unique name for the form
  form: "note",
})(NoteForm);

export default NoteForm;
