import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookie from "../../helper/cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/loading";

class Info extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      code: 0,
      loading: false,
    };
  }

  sendCode = (e) => {
    this.setState({ loading: true });
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL_API}/otp/verify-email?email=${this.state.email}`,
      headers: {
        Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
      },
    })
      .then(() => {
        this.setState({ loading: false });
        toast.success("Vui lòng kiểm tra email và nhập mã xác thực.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch(() => {
        this.setState({ loading: false });
        toast.error("Mã xác thực không hợp lệ!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleUpdate = async (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL_API}/otp/verify?code=${this.state.code}`,
        headers: {
          Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
        },
      });
      this.setState({ loading: false });

      toast.success(
        "Thông tin đã được lưu lại. Vui lòng liên hệ công chương viên để xác thực.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      window.location.href = "/";
    } catch (error) {
      this.setState({ loading: false });
      toast.error("Mã xác thực không hợp lệ!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <Loading isLoading={this.state.loading} />
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="db-add-list-wrap">
              <div className="db-add-listing">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          name="email"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Email xác nhận"
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="col-md-12 mb-10">
                      <button
                        className="btn v4"
                        style={{
                          backgroundColor: "#6449e7",
                          color: "white !important",
                        }}
                        onClick={(e) => this.sendCode(e)}
                      >
                        Gửi mã xác thực
                      </button>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Code</label>
                        <input
                          name="code"
                          type="text"
                          className="form-control filter-input"
                          placeholder="Nhập mã xác thực email..."
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <button
                        className="btn v3"
                        onClick={(e) => this.handleUpdate(e)}
                      >
                        Cập nhập
                      </button>
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

const mapStateToProps = (state) => ({
  profile: state.form.profile,
  accessToken: state.login.accessToken,
  user: state.user.data,
});

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
