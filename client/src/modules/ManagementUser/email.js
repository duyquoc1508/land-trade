import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookie from "../../helper/cookie";

import Loading from '../../components/Loading/loading'

class Info extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      code: 0,
      loading: false
    };
  }

  sendCode = async(e) =>{
    this.setState({loading: true})
    e.preventDefault();
    let response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL_API}/otp/verify-email?email=${this.state.email}`,
      headers: {
        Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
      },
    });
    if (response.status == 200) {
      this.setState({ loading: false })
      alert('thanh cong')
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleUpdate = async (e) => {
    this.setState({ loading: true })
    e.preventDefault();
    let response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL_API}/otp/verify?code=${this.state.code}`,
      headers: {
        Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
      },
    });
    if (response.status == 200) {
      this.setState({ loading: false })
      
      window.location.href = '/';
    } else{
      this.setState({ loading: false })
      alert('Vui long thu lai')
    }

  }

  render() {
    return (
      <div className="container">
        <Loading isLoading={this.state.loading}/>
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

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Code</label>
                        <table>
                          <tbody>
                            <tr>
                              <td colSpan={2}>
                                <input
                                  name="code"
                                  type="text"
                                  className="form-control filter-input"
                                  placeholder="Code"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </td>
                              <td>
                                <button className="btn v2" onClick={(e) => this.sendCode(e)}>Gửi</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <button className="btn v3" onClick={(e) => this.handleUpdate(e)}>Cập nhập</button>
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
