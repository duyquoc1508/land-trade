import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Field, reduxForm } from "redux-form";
import { UpdateUser } from "../Profile/EditProfile/actions";

class Info extends Component {
  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
    // this.getStep = this.getStep.bind(this);
    // this.nextStep = this.nextStep.bind(this);
  }

  componentDidMount() {
    const user = this.props.user;
    this.props.change("fullName", user.fullName || "");
    this.props.change("idNumber", user.idNumber || "");
    this.props.change("homeLand", user.homeLand || "");
    this.props.change("birthday", user.birthday || "");
    this.props.change("permanentResidence", user.permanentResidence || "");
    // this.props.change("ethnic", user.ethnic || "");
    // this.props.change("religion", user.religion || "");
    // this.props.change("deformity", user.deformity || "");
    // this.props.change("dateIdNumber", user.dateIdNumber || "");
    // this.props.change("placeIdNumber", user.placeIdNumber || "");
    // this.props.change("phoneNumber", user.phoneNumber || "");
    // this.props.change("email", user.email || "");
  }

  handleUpdate() {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL_API}/users`,
      data: this.props.profile.values,
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
      },
    })
      .then((response) => {
        this.props.actUpdate(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        window.location.href = `/verify-account?step=${this.nextStep()}`;
      })
      .catch((err) => alert(err));
  }

  nextStep() {
    return this.getStep() + 1;
  }

  getStep() {
    return Number(new URLSearchParams(location.search).get("step")) || 0;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="db-add-list-wrap">
              <div className="db-add-listing">
                <form onSubmit={this.props.handleSubmit(this.handleUpdate)}>
                  <div className="row ">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Họ tên</label>
                        <Field
                          component="input"
                          name="fullName"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Nhập Họ tên"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Số CMND/Căn cước</label>
                        <Field
                          component="input"
                          name="idNumber"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Nhập số CMND căn cước"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Sinh ngày</label>
                        <Field
                          component="input"
                          name="birthday"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Sinh ngày"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Nguyên quán</label>
                        <Field
                          component="input"
                          name="homeLand"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Nguyên quán"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Nơi ĐKHK thường trú</label>
                        <Field
                          component="input"
                          name="permanentResidence"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Nơi ĐKHK thường trú"
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label>Dân tộc</label>
                        <Field
                          component="input"
                          name="ethnic"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Dân tộc"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Tôn giáo</label>
                        <Field
                          component="input"
                          name="religion"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Tôn giáo"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Dấu vết riêng và dị hình</label>
                        <Field
                          component="input"
                          name="deformity"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Dấu vết riêng và dị hình"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Ngày cấp</label>
                        <Field
                          component="input"
                          name="dateIdNumber"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Ngày cấp"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Nơi cấp</label>
                        <Field
                          component="input"
                          name="placeIdNumber"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Nơi cấp"
                        />
                      </div>
                    </div> */}

                    <div className="col-md-12">
                      <button className="btn v3">Cập nhập</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Info = reduxForm({
  // a unique name for the form
  form: "profile",
})(Info);

const mapStateToProps = (state) => ({
  profile: state.form.profile,
  accessToken: state.login.accessToken,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actUpdate: (user) => {
      dispatch(UpdateUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
