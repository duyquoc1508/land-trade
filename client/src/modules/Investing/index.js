import React, { Component } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import axios from "axios";
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

export default class Investing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Địa chỉ",
          field: "title",
        },
        {
          title: "Mã giao dịch",
          field: "hash",
        },
        {
          title: "Giá trị giao dịch",
          field: "transferPrice",
        },
        {
          title: "Người bán",
          field: "seller",
        },
        {
          title: "Người mua",
          field: "buyer",
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
        `${process.env.REACT_APP_BASE_URL_API}/transaction/investing`
      );

      let { transactions, properties } = response.data.data;

      let arrNewPeople = transactions.reduce(
        (result, item) => result.concat(item.sellers, item.buyers),
        []
      );
      console.log(arrNewPeople);
      let people = Array.from(new Set(arrNewPeople));

      people = await Promise.all(
        people.map((person) =>
          axios.get(`${process.env.REACT_APP_BASE_URL_API}/users/${person}`)
        )
      );
      const publicAddressToName = people.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.data.data.publicAddress]: cur.data.data.fullName,
        }),
        {}
      );
      let data = transactions.map((transaction) => ({
        hash: transaction.transactionHash,
        title: properties.find(
          (item) => item.idInBlockchain == transaction.idPropertyInBlockchain
        ).properties.landLot.address,
        transferPrice: `${formatCurrency(
          convertWeiToVND(transaction.transferPrice)
        )} VNĐ`,
        seller: publicAddressToName[transaction.sellers[0]],
        buyer: publicAddressToName[transaction.buyers[0]],
        state: transaction.state,
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
    // if (
    //   ["DEPOSIT_REQUEST", "DEPOSIT_CONFIRMED", "PAYMENT_REQUEST"].includes(
    //     rowData.state
    //   )
    // ) {
    //   this.setState({ openAction: true });
    // } else {
    window.open(
      `${process.env.REACT_APP_BASE_URL}/transaction-detail/${rowData.hash}`
    );
    // this.props.history.push(`/transaction-detail/${rowData.hash}`);
    // }
  };

  closePreview = () => {
    this.setState({ openAction: false });
  };

  render() {
    return (
      <div className="mt-100 container" style={{ maxWidth: "" }}>
        <MaterialTable
          isLoading={this.state._isLoading}
          title={`Tra cứu lịch sử giao dịch `}
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
        <div>
          <Dialog
            open={this.state.openAction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              Giao dịch đang diễn ra, bạn không thể xem giao dịch này!
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => this.closePreview()}>
                Đóng
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
