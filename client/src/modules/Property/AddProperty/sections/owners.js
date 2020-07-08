import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import Cookie from "../../../../helper/cookie";
import "./owner.css";

class OwnersForm extends Component {
  getValue(data) {
    console.log(data);
  }
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      owners: [1],
      listAllUser: [],
      idNumberToPublicAddresses: {},
      currentIndex: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL_API}/users?verified=2`,
      {
        headers: { Authorization: `Bearer ${Cookie.getCookie("accessToken")}` },
      }
    );
    const owners = response.data.data;
    this.setState({
      idNumberToPublicAddresses: owners.reduce(
        (accumulator, current) => ({
          ...accumulator,
          [current.idNumber]: current.publicAddress,
        }),
        {}
      ),
    });
    this.setState({ listAllUser: owners });
  }

  async handleChange(e) {
    const options = this.state.listAllUser.filter((user) =>
      JSON.stringify(user).includes(e.target.value)
    );
    this.setState({ options });

    this.props.change(
      `publicAddress[${this.state.currentIndex}]`,
      this.getPublicAddress(e.target.value)
    );
    // e.target.parentNode.children[1].setAttribute(
    //   "value",
    //   this.getPublicAddress(e.target.value)
    // );
  }

  getPublicAddress = (str) => {
    let idNumber = str.split(" - ")[1];
    // console.log(this.state);
    // idNumber = "224528479";
    // console.log();
    return this.state.idNumberToPublicAddresses[idNumber];
  };

  handleSubmit() {}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.showInput(this.state.owners)}
        {/* <div class="input-search"></div> */}
        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary btn-xs"
            onClick={() => {
              this.setState({
                owners: [...this.state.owners, 1],
                currentIndex: this.state.currentIndex + 1,
              });
              console.log(this.state.owners);
            }}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
            {" Thêm người sở hữu"}
          </button>
          <button
            type="button"
            className="btn btn-danger btn-xs"
            onClick={() => {
              const [first, ...arrOwners] = this.state.owners;
              console.log(first);
              this.setState({
                owners: arrOwners,
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

  showInput = (owners) => {
    var res = null;
    if (owners.length > 0) {
      res = owners.map((item, index) => {
        return (
          <div key={index}>
            <label className="col-md-12 ">
              Địa chỉ của chủ sỡ hữu {index + 1}
            </label>

            <div className="input-group mb-3 input-search">
              <input
                // name={`owners[${index}]`}
                placeholder="Địa chỉ của chủ sỡ hữu"
                component="input"
                type="text"
                className="form-control filter-input"
                list={`owner_${index}`}
                autoComplete="on"
                onChange={this.handleChange}
              />
              <Field
                name={`publicAddress[${index}]`}
                // placeholder="Địa chỉ của chủ sỡ hữu"
                component="input"
                type="hidden"
                // className="form-control filter-input"
                // list={`owner_${index}`}
                // autoComplete="on"
                // onChange={this.handleChange}
              />

              <datalist
                id={`owner_${index}`}
                style={{ display: "none", width: "100%" }}
              >
                {this.showOptions(this.state.listAllUser)}
              </datalist>
            </div>
          </div>
        );
      });
    }
    return res;
  };

  showOptions = (options) => {
    var result = null;
    if (options.length > 0) {
      result = options.map((option, index) => {
        return (
          <option
            key={index}
            value={`${option.fullName} - ${option.idNumber}`}
            label={option.publicAddress}
            data-address={option.publicAddress}
          />
        );
      });
    }
    return result;
  };
}

OwnersForm = reduxForm({
  // a unique name for the form
  form: "owners",
})(OwnersForm);

export default OwnersForm;
