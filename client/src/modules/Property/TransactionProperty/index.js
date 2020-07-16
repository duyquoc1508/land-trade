import React, { Component } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import axios from "axios";
import formatDate from "../../../utils/formatDate";
import { convertWeiToVND } from "../../../utils/convertCurrency";
import formatCurrency from "../../../utils/formatCurrency";

const state = {
  DEPOSIT_REQUEST: "Đang đặt cọc",
  DEPOSIT_CONFIRMED: "Đã đặt cọc",
  PAYMENT_REQUEST: "Đang thanh toán",
  PAYMENT_CONFIRMED: "Giao dich thành công",
  CANCELED: "Đã hủy",
};

export default class TransactionProperty extends Component {
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
          title: "Ngày Kết thúc",
          field: "timeEnd",
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
      const responseT = axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/transaction/property/${this.props.match.params.idPropertyInBlockchain}`
      );
      const responseP = axios.get(
        `${process.env.REACT_APP_BASE_URL_API}/certification/${this.props.match.params.hash}`
      );
      const [transactionR, propertyR] = await Promise.all([
        responseT,
        responseP,
      ]);
      let [transaction, property] = [
        transactionR.data.data,
        propertyR.data.data,
      ];
      let data = transaction.map((transaction) => ({
        hash: transaction.transactionHash,
        title: property.properties.landLot.address,
        transferPrice: `${formatCurrency(
          convertWeiToVND(transaction.transferPrice)
        )} VNĐ`,
        timeEnd: formatDate(transaction.timeEnd),
        state: transaction.state,
      }));

      this.setState({
        data,
        _isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  previewDetail = (event, rowData) => {
    if (
      ["DEPOSIT_REQUEST", "DEPOSIT_CONFIRMED", "PAYMENT_REQUEST"].includes(
        rowData.state
      )
    ) {
      this.setState({ openAction: true });
    } else {
      window.open(
        `${process.env.REACT_APP_BASE_URL}/transaction-detail/${rowData.hash}`
      );
    }
  };

  closePreview = () => {
    this.setState({ openAction: false });
  };

  render() {
    return (
      <div className="mt-100 container" style={{ maxWidth: "" }}>
        <MaterialTable
          isLoading={this.state._isLoading}
          title={`Lịch sử giao dịch của tài sản tại ${
            this.state.data[0] && this.state.data[0].title
          }`}
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
