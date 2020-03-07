import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";

class OwnersForm extends Component {
  getValue(data) {
    // console.log(data);
  }
  constructor(props) {
    super(props);
    this.state = { options: ["Nhap tim kiem ket qua"], owners: [1] };
    this.handleChange = this.handleChange.bind(this);
    this.showInput = this.showInput.bind(this);
  }

  async handleChange(e) {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL_API}/users/search?q=${e.target.value}`
    );
    const owners = await response.data.data;
    console.log(owners.length);
    if (owners.length === 0) {
      this.setState({ options: ["Không tìm thấy kết quả ..."] });
    }
    this.setState({ options: owners.map(owner => owner.publicAddress) });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.getValue)}>
        {this.showInput(this.state.owners)}

        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary btn-xs"
            onClick={() => {
              console.log(this.state.owners);
              this.setState({
                owners: [...this.state.owners, ...[1]]
              });
            }}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
            {" Thêm người sở hữu"}
          </button>
          <button
            type="button"
            className="btn btn-danger btn-xs"
            onClick={() => {
              this.setState({
                owners: [1]
              });
            }}
          >
            <i className="fas fa-times"></i>
            {" Xóa "}
          </button>
        </div>
      </form>
    );
  }

  showInput = owners => {
    var res = null;
    if (owners.length > 0) {
      res = owners.map((item, index) => {
        return (
          <div key={index}>
            <label className="col-md-8">
              Địa chỉ của chủ sỡ hữu {index + 1}
            </label>
            <div className="col-md-8">
              <div className="input-group mb-3 input-search">
                <Field
                  name={`publicAddress[${index}]`}
                  placeholder="Địa chỉ của chủ sỡ hữu"
                  component="input"
                  type="text"
                  className="form-control filter-input"
                  list="browsers"
                  aria-describedby="basic-addon2"
                  onChange={this.handleChange}
                />

                <datalist
                  className=""
                  id="browsers"
                  style={{ display: "none", width: "100%" }}
                >
                  {this.showOptions(this.state.options)}
                </datalist>
              </div>
            </div>
          </div>
        );
      });
    }
    return res;
  };

  showOptions = options => {
    var result = null;
    if (options.length > 0) {
      result = options.map((option, index) => {
        return (
          <option key={option} style={{ width: "100%" }}>
            {option}{" "}
          </option>
        );
      });
    }
    return result;
  };
}
OwnersForm = reduxForm({
  // a unique name for the form
  form: "owners"
})(OwnersForm);

export default OwnersForm;
