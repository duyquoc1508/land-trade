import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { convertWeiToVND } from "../../utils/convertCurrency";
import formatCurrency from "../../utils/formatCurrency";

import { cancelTransactionRequest, cancelTransactionSuccess } from "./action";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CancelTransaction = (props) => {
  const [open, setOpen] = React.useState(false);
  const [compensation, setCompensation] = React.useState(0);
  const [received, setReceived] = React.useState(0);
  const [tax, setTax] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const TRANSACTION_STATE = {
    DEPOSIT_REQUEST: "DEPOSIT_REQUEST",
    DEPOSIT_CONFIRMED: "DEPOSIT_CONFIRMED",
    PAYMENT_REQUEST: "PAYMENT_REQUEST",
    PAYMENT_CONFIRMED: "PAYMENT_CONFIRMED",
    CANCELED: "CANCELED",
  };

  const PARTY = {
    BUYER: "BUYER",
    SELLER: "SELLER",
  };

  useEffect(() => {
    if (props.party === PARTY.BUYER) {
      if (props.transaction.state === TRANSACTION_STATE.DEPOSIT_REQUEST) {
        setCompensation(0);
        setReceived(props.transaction.depositPrice);
        setTax(0);
      }
      if (props.transaction.state === TRANSACTION_STATE.DEPOSIT_CONFIRMED) {
        setCompensation(0);
        setReceived(0);
        setTax(0);
      }
      if (props.transaction.state === TRANSACTION_STATE.PAYMENT_REQUEST) {
        setCompensation(0);
        setReceived(
          props.transaction.transferPrice - props.transaction.depositPrice
        );
        setTax(props.transaction.transferPrice * 0.005);
      }
    }
    if (props.party === PARTY.SELLER) {
      // if (props.transaction.state == "DEPOSIT_REQUEST") {
      //   setCompensation(0);
      //   setReceived(0);
      //   setTax(0);
      // }
      if (props.transaction.state === TRANSACTION_STATE.DEPOSIT_CONFIRMED) {
        setCompensation(2 * props.transaction.depositPrice);
        setReceived(0);
        setTax(0);
      }
      if (props.transaction.state === TRANSACTION_STATE.PAYMENT_REQUEST) {
        setCompensation(2 * props.transaction.depositPrice);
        setReceived(0);
        setTax(0);
      }
    }
  }, [props.transaction]);

  return (
    <Fragment>
      {props.checkExpired && (
        <div>
          <div className="text-center">
            <h5>Giao dịch đã hết hạn</h5>
          </div>
          <button
            className="btn v3 float-right mt-5 "
            onClick={() =>
              props.history.push(
                `/transaction-detail/${props.transaction.transactionHash}`
              )
            }
          >
            <i className="ion-ios-search"></i> Tra cứu giao dịch tại đây
          </button>
        </div>
      )}

      {!props.checkExpired &&
        !["CANCELED", "PAYMENT_CONFIRMED"].includes(
          props.transaction.state
        ) && (
          <button
            className="btn v3 float-right mt-5 "
            onClick={handleClickOpen}
          >
            <i className="ion-android-cancel"></i> Hủy giao dịch
          </button>
        )}

      {props.transaction.state === "CANCELED" && (
        <div>
          <div className="text-center">
            <h5>Giao dịch đã hủy</h5>
          </div>
          <button
            className="btn v3 float-right mt-5 "
            onClick={() =>
              props.history.push(
                `/transaction-detail/${props.transaction.transactionHash}`
              )
            }
          >
            <i className="ion-ios-search"></i> Tra cứu giao dịch tại đây
          </button>
        </div>
      )}

      {props.transaction.state === "PAYMENT_CONFIRMED" && (
        <div>
          <div className="text-center">
            <h5>Giao dịch đã thành công </h5>
          </div>
          <button
            className="btn v3 float-right mt-5 "
            onClick={() =>
              props.history.push(
                `/transaction-detail/${props.transaction.transactionHash}`
              )
            }
          >
            <i className="ion-ios-search"></i> Tra cứu giao dịch tại đây
          </button>
        </div>
      )}

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Hủy giao dịch
        </DialogTitle>
        <DialogContent dividers>
          <div className="agent-details">
            <h5>Giá trị đặt cọc</h5>
            <ul className="address-list">
              <li>
                <span>Người hủy hợp đồng:</span>
                {props.user.fullName} - {props.party}
              </li>
              <li>
                <span>Số tiền đền bù:</span>
                {formatCurrency(convertWeiToVND(compensation))} VNĐ
              </li>
              <li>
                <span>Số tiền nhận lại:</span>
                {formatCurrency(convertWeiToVND(received))} VNĐ
              </li>
              <li>
                <span>Tiền thuế:</span>
                {formatCurrency(convertWeiToVND(tax))} VNĐ
              </li>
            </ul>
          </div>
          {/* <div className="agent-details">
            <h5>Lưu ý:</h5>
            <ul className="address-list">
              <li>
                Với việc xác nhận này bạn sẽ nhận được tiền đặt cọc, và tài sản
                sẽ được chuyển nhượng nếu người mua thanh toán đủ số tiền giao
                dịch.
              </li>
            </ul>
          </div> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleClose();
              props.cancelTransaction(
                props.transaction,
                props.user.publicAddress
              );
            }}
            color="primary"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
    user: state.user.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelTransaction: (transaction, publicAddress) => {
      dispatch(cancelTransactionRequest(transaction, publicAddress));
    },
    cancelTransactionSuccess: (txHash) => {
      dispatch(cancelTransactionSuccess(txHash));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelTransaction);
