import React, { Component } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import axios from "axios";
import Cookie from "../../helper/cookie";

export default class ManagementUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        // { title: "No", field: "tableData.id" },
        {
          title: "Số CMND",
          field: "idNumber",
        },
        {
          title: "Họ tên",
          field: "fullname",
        },
        {
          title: "Trạng Thái",
          field: "state",
          lookup: { 0: "Chưa duyệt", 1: "Chờ duyệt", 2: "Đã duyệt" },
        },
      ],
      data: [],
      web3: null,
      userSelected: {},
      _isLoading: false,
      openAction: false,
    };
  }
  componentDidMount = async () => {
    this.fetchData();
  };

  fetchData = async () => {
    console.log("index -> fetchData -> fetchData");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/users`,
        {
          headers: {
            Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
          },
        }
      );
      const owners = response.data.data;

      this.setState({
        data: owners.map((owner) => ({
          idNumber: owner.idNumber,
          fullname: owner.fullName,
          state: owner.isVerifired,
          ...owner,
        })),
        _isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  previewUser = (event, rowData) => {
    // alert(JSON.stringify(rowData))
    // let userSelected =
    this.setState({ openAction: true, userSelected: rowData });
  };
  closePreview = () => {
    this.setState({ openAction: false });
  };

  verifyAccount = async () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL_API}/users/verify-account?userId=${this.state.userSelected._id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
          },
        }
      )
      .then(() => alert("done"))
      .catch((error) => alert(error))
      .finally(this.closePreview());
  };

  render() {
    return (
      <div className="mt-100 container" style={{ maxWidth: "800px" }}>
        <MaterialTable
          isLoading={this.state._isLoading}
          title="Quản lý người dùng"
          columns={this.state.columns}
          options={{
            actionsColumnIndex: -1,
          }}
          data={this.state.data}
          actions={[
            (rowData) => ({
              icon: "preview",
              tooltip: "View User",
              onClick: (e) => this.previewUser(e, rowData),
            }),
          ]}
        />
        <div>
          <Dialog
            open={this.state.openAction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <div className="db-add-listing">
                <div className="row">
                  <div className="col-md-12">
                    {this.state.userSelected.imageIdNumber
                      ? this.state.userSelected.imageIdNumber.map((image) => (
                          <img
                            className="col-sm-6"
                            src={`${process.env.REACT_APP_BASE_URL_IMAGE}/CMND/${image}`}
                          />
                        ))
                      : ""}
                    <div className="form-group">
                      <label>Họ tên</label>
                      <input
                        value={this.state.userSelected.fullname}
                        disabled={true}
                        name="fullName"
                        type="text"
                        className="form-control filter-input"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Số CMND/Căn cước</label>
                      <input
                        name="idNumber"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.idNumber}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Sinh ngày</label>
                      <input
                        name="birthday"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.birthday}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Nguyên quán</label>
                      <input
                        name="homeLand"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.homeLand}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Nơi ĐKHK thường trú</label>
                      <input
                        name="permanentResidence"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.permanentResidence}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Dân tộc</label>
                      <input
                        name="ethnic"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.ethnic}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tôn giáo</label>
                      <input
                        name="religion"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.religion}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Dấu vết riêng và dị hình</label>
                      <input
                        name="deformity"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.deformity}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Ngày cấp</label>
                      <input
                        name="dateIdNumber"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.dateIdNumber}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nơi cấp</label>
                      <input
                        name="placeIdNumber"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.placeIdNumber}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input
                        name="phoneNumber"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.phoneNumber}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Thư điện tử (email)</label>
                      <input
                        name="email"
                        type="text"
                        className="form-control filter-input"
                        value={this.state.userSelected.email}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* </DialogContentText>
            </DialogContent> */}
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => this.closePreview()}>
                Hủy bỏ
              </Button>
              <Button
                color="primary"
                onClick={() => this.verifyAccount()}
                autoFocus
              >
                Duyệt
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
