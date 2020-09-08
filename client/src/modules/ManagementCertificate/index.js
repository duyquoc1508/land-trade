import React, { Component } from "react";
import MaterialTable from "material-table";

import axios from "axios";

export default class Investing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Địa chỉ",
          field: "address",
        },
        {
          title: "Thửa đất số",
          field: "landLotNo",
        },
        {
          title: "Tờ bản đồ số",
          field: "mapSheetNo",
        },
        //0: Not activated, 1: Activated, 2: Selling, 3: In transaction
        {
          title: "Trạng Thái",
          field: "state",
          render: (rowData) => {
            switch (rowData.state) {
              case 0:
                return (
                  <span
                    style={{
                      color: "blue",
                    }}
                  >
                    <i class="fas fa-spinner"></i> Chờ duyệt
                  </span>
                );
              case 1:
                return (
                  <span
                    style={{
                      color: "green",
                    }}
                  >
                    <i class="fas fa-clipboard-check"></i> Đã Duyệt
                  </span>
                );
              case 2:
                return (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    <i class="fab fa-sellcast"></i> Đang bán
                  </span>
                );
              default:
                return (
                  <span
                    style={{
                      color: "orange",
                    }}
                  >
                    <i class="fas fa-spinner"></i> Đang trong giao dịch
                  </span>
                );
            }
          },
        },
      ],
      data: [],
      rowSelected: {},
      _isLoading: false,
      openAction: false,
    };
  }
  componentDidMount = async () => {
    this.fetchData();
  };

  fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/certification/all-status`
      );

      let certificates = response.data.data;

      let data = certificates.map((certificate) => ({
        address: certificate.properties.landLot.address,
        landLotNo: certificate.properties.landLot.landLotNo,
        mapSheetNo: certificate.properties.landLot.mapSheetNo,
        state: certificate.state,
        hash: certificate.transactionHash,
      }));
      console.log(data);
      this.setState({
        data,
        _isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  previewDetail = (event, rowData) => {
    window.open(
      `${process.env.REACT_APP_BASE_URL}/property-standard/${rowData.hash}`
    );
  };

  closePreview = () => {
    this.setState({ openAction: false });
  };

  render() {
    return (
      <div className="mt-100 container" style={{ maxWidth: "" }}>
        <MaterialTable
          isLoading={this.state._isLoading}
          title={`Danh sách tài sản `}
          columns={this.state.columns}
          options={{
            actionsColumnIndex: -1,
            rowStyle: {
              wordBreak: "break-all",
            },
          }}
          data={this.state.data}
          actions={[
            (rowData) => ({
              name: "Xem chi tiết",
              icon: "preview",
              tooltip: "Xem chi tiết",
              onClick: (e) => this.previewDetail(e, rowData),
            }),
          ]}
        />
      </div>
    );
  }
}
