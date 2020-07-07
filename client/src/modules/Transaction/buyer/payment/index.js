import React from "react";
import { connect } from "react-redux";
import { paymentRequest } from "./action";
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
const Payment = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <h1>Giao diện bên mua</h1>
      <p>Giao diện thanh toán phần còn lại</p>
      <button className="btn v3 float-right mt-5 " onClick={handleClickOpen}>
        <i className="ion-android-cancel"></i> Chuyển số tiền còn lại
      </button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Chuyển tiền
        </DialogTitle>
        <DialogContent dividers>
          <div className="agent-details">
            <h5>Giá trị giao dịch</h5>
            <ul className="address-list">
              <li>
                <span>Số tiền chuyển:</span>
                {convertWeiToVND(props.transaction.transferPrice)}
              </li>
            </ul>
          </div>
          <div className="agent-details">
            <h5>Lưu ý:</h5>
            <ul className="address-list">
              <li>
                Với việc xác nhận này bạn sẽ chuyển số tiền giao dich cho người
                bán và chờ xác nhận để hoàn tất việc nhận tài sản
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
              props.paymentRequest(props.transaction);
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
  return { transaction: state.transaction.data };
};

const mapDispatchToProps = (dispatch) => {
  return {
    paymentRequest: (idTransaction) => {
      dispatch(paymentRequest(idTransaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
