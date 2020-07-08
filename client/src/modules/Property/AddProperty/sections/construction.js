import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
// import

// // Require Editor JS files.
// import "froala-editor/js/froala_editor.pkgd.min.js";

// import "froala-editor/css/froala_style.min.css";
// import "froala-editor/css/froala_editor.pkgd.min.css";

// import "froala-editor/js/plugins.pkgd.min.js";

// import FroalaEditor from "react-froala-wysiwyg";

class ConstructionForm extends Component {
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
                <label>Công trình xây dựng khác</label>
                <Field
                  name="otherConstruction"
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

ConstructionForm = reduxForm({
  // a unique name for the form
  form: "construction",
})(ConstructionForm);

export default ConstructionForm;
