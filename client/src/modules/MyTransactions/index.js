import React, { Component } from "react";
import MaterialTable from "material-table";

import axios from "axios";
import Cookie from "../../helper/cookie";
import formatDate from "../../utils/formatDate";
import { convertWeiToVND } from "../../utils/convertCurrency";
import formatCurrency from "../../utils/formatCurrency";

const state = {
  DEPOSIT_REQUEST: "Đang đặt cọc",
  DEPOSIT_CONFIRMED: "Đã đặt cọc",
  PAYMENT_REQUEST: "Đang thanh toán",
  PAYMENT_CONFIRMED: "Giao dich thành công",
  CANCELED: "Đã hủy",
};

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
          title: "Giá trị giao dịch",
          field: "transferPrice",
        },
        {
          title: "Ngày bắt đầu",
          field: "timeStart",
        },
        {
          title: "Loại giao dịch",
          field: "transactionType",
          render: (rowData) => (
            <span
              style={{
                backgroundColor: `${
                  rowData.transactionType === "Mua" ? "green" : "orange"
                }`,
                color: "white",
                padding: "5px 10px",
                width: "100px",
                textAlign: "center",
              }}
            >
              {rowData.transactionType}
            </span>
          ),
        },
        {
          title: "Trạng Thái",
          field: "state",
          render: (rowData) => {
            switch (rowData.state) {
              case "CANCELED":
                return (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    <i class="far fa-times-circle"></i> {state[rowData.state]}
                  </span>
                );
              case "PAYMENT_CONFIRMED":
                return (
                  <span
                    style={{
                      color: "green",
                    }}
                  >
                    <i class="fas fa-clipboard-check"></i>{" "}
                    {state[rowData.state]}
                  </span>
                );
              default:
                return (
                  <span
                    style={{
                      color: "orange",
                    }}
                  >
                    <i class="fas fa-spinner"></i> {state[rowData.state]}
                  </span>
                );
            }
          },
        },
        {
          title: "Kiểm tra trên Blockchain",
          field: "hash",
          render: (rowData) => (
            <a
              target="_blank"
              href={`${process.env.REACT_APP_EXPLORER}/tx/${rowData.hash}`}
            >
              {"Xem"}
            </a>
          ),
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
        transferPrice: `${formatCurrency(
          convertWeiToVND(transaction.transferPrice)
        )} VNĐ`,
        timeStart: formatDate(transaction.timeStart),
        transactionType: "Mua",
        state: transaction.state,
      }));
      let data2 = transactionSale.map((transaction, index) => ({
        hash: transaction.transactionHash,
        title: properties.find(
          (item) => item.idInBlockchain == transaction.idPropertyInBlockchain
        ).properties.landLot.address,
        transferPrice: `${formatCurrency(
          convertWeiToVND(transaction.transferPrice)
        )} VNĐ`,
        timeStart: formatDate(transaction.timeStart),
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
      // window.open(
      //   `${process.env.REACT_APP_BASE_URL}/transaction-detail/${rowData.hash}`
      // );
      this.props.history.push(`/transaction-detail/${rowData.hash}`);
    } else {
      // window.open(
      //   `${process.env.REACT_APP_BASE_URL}/transaction/${rowData.hash}`
      // );
      this.props.history.push(`/transaction/${rowData.hash}`);
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
