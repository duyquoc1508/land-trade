import React, { Component } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import axios from "axios";
import Cookie from "../../helper/cookie";
import formatDate from "../../utils/formatDate";

export default class MyTransactons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Địa chỉ",
          field: "title",
        },
        {
          title: "Ngày bắt đầu",
          field: "timeStart",
        },
        {
          title: "Ngày Kết thúc",
          field: "timeEnd",
        },
        {
          title: "Loại giao dịch",
          field: "transactionType",
        },
        {
          title: "Trạng Thái",
          field: "state",
          lookup: {
            DEPOSIT_REQUEST: "Đang đặt cọc",
            DEPOSIT_CONFIRMED: "Đã đặt cọc",
            PAYMENT_REQUEST: "Đang thanh toán",
            PAYMENT_CONFIRMED: "Giao dich thành công",
            CANCELED: "Đã hủy",
          },
        },
      ],
      data: [],
      rowSelected: {},
      _isLoading: false,
    };
  }
  componentDidMount = async () => {
    this.fetchData();
  };

  fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/transaction`,
        {
          headers: {
            Authorization: `Bearer ${Cookie.getCookie("accessToken")}`,
          },
        }
      );
      const {
        properties,
        transactionBuy,
        transactionSale,
      } = response.data.data;

      let data1 = transactionBuy.map((transaction, index) => ({
        hash: transaction.transactionHash,
        title: properties.find(
          (item) => item.idInBlockchain == transaction.idPropertyInBlockchain
        ).properties.landLot.address,
        timeStart: formatDate(transaction.timeStart),
        timeEnd: formatDate(transaction.timeEnd),
        transactionType: "Mua",
        state: transaction.state,
      }));
      let data2 = transactionSale.map((transaction, index) => ({
        hash: transaction.transactionHash,
        title: properties.find(
          (item) => item.idInBlockchain == transaction.idPropertyInBlockchain
        ).properties.landLot.address,
        timeStart: formatDate(transaction.timeStart),
        timeEnd: formatDate(transaction.timeEnd),
        transactionType: "Bán",
        state: transaction.state,
      }));

      this.setState({
        data: [...data1, ...data2],
        _isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  previewDetail = (event, rowData) => {
    if (["PAYMENT_CONFIRMED", "CANCELED"].includes(rowData.state)) {
      window.open(
        `${process.env.REACT_APP_BASE_URL}/transaction-detail/${rowData.hash}`
      );
    } else {
      window.open(
        `${process.env.REACT_APP_BASE_URL}/transaction/${rowData.hash}`
      );
    }
  };

  render() {
    return (
      <div className="mt-100 container" style={{ maxWidth: "" }}>
        <MaterialTable
          isLoading={this.state._isLoading}
          title="Giao dịch của tôi"
          columns={this.state.columns}
          options={{
            actionsColumnIndex: -1,
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
