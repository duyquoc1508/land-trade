import React from "react";
import { connect } from "react-redux";
import { acceptTransactionRequest } from "./action";
import TransactionInfo from "../../../TransactionInfo";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { convertWeiToVND } from "../../../../utils/convertCurrency";
import formatCurrency from "../../../../utils/formatCurrency";

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

const AcceptTransaction = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h4 className="">Tổng quan</h4>
      <TransactionInfo />
      {props.transaction.state == "DEPOSIT_REQUEST" && !props.checkExpired && (
        <button className="btn v3 float-right mt-5 " onClick={handleClickOpen}>
          <i className="ion-android-cancel"></i> Chấp nhận giao dịch
        </button>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Chấp nhận giao dịch
        </DialogTitle>
        <DialogContent dividers>
          <div className="agent-details">
            <h5>Giá trị đặt cọc</h5>
            <ul className="address-list">
              <li>
                <span>Số tiền nhận:</span>
                {formatCurrency(
                  convertWeiToVND(props.transaction.depositPrice)
                )}{" "}
                VNĐ
              </li>
            </ul>
          </div>
          <div className="agent-details">
            <h5>Lưu ý:</h5>
            <ul className="address-list">
              <li>
                Với việc xác nhận này bạn sẽ nhận được tiền đặt cọc, và tài sản
                sẽ được chuyển nhượng nếu người mua thanh toán đủ số tiền giao
                dịch.
              </li>
            </ul>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleClose();
              props.acceptTransactionRequest(props.transaction.idInBlockchain);
            }}
            color="primary"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    acceptTransactionRequest: (idTransaction) => {
      dispatch(acceptTransactionRequest(idTransaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptTransaction);
