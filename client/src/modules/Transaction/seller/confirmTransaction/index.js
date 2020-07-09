import React from "react";
import { connect } from "react-redux";
import { confirmTransactionRequest } from "./actions";
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
const ConfirmTransaction = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="agent-details">
          <h5>Xác nhận giao dịch</h5>
          <ul className="address-list">
            <li>
              <span>Giá trị giao dịch:</span>
              {formatCurrency(
                convertWeiToVND(props.transaction.transferPrice)
              )}{" "}
              VNĐ
            </li>
            <li>
              <span>Số tiền đã đặt cọc:</span>
              {formatCurrency(
                convertWeiToVND(props.transaction.depositPrice)
              )}{" "}
              VNĐ
            </li>
            <li>
              <span>Số tiền còn lại:</span>
              {formatCurrency(
                convertWeiToVND(
                  props.transaction.transferPrice -
                    props.transaction.depositPrice
                )
              )}{" "}
              VNĐ
            </li>
            <li>
              <span>Thuế thu nhập cá nhân:</span>
              {formatCurrency(
                convertWeiToVND(props.transaction.transferPrice * 0.02)
              )}{" "}
              VNĐ
            </li>
            <li>
              <span>Số tiền nhận được:</span>
              {formatCurrency(
                convertWeiToVND(
                  props.transaction.transferPrice -
                    props.transaction.depositPrice -
                    props.transaction.transferPrice * 0.02
                )
              )}{" "}
              VNĐ
            </li>
          </ul>
          <h6>Lưu ý</h6>
          <ul className="address-list">
            <li>
              Việc đồng ý xác nhận giao dịch này đồng nghĩa bạn phải thực hiện
              đúng các yêu cầu của điều khoản của hợp đồng!
            </li>
          </ul>
        </div>
        {props.transaction.state == "PAYMENT_REQUEST" && !props.checkExpired && (
          <button
            className="btn v3 float-right mt-5 "
            onClick={handleClickOpen}
          >
            <i className="ion-android-cancel"></i> Xác nhận giao dịch
          </button>
        )}
      </div>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Xác nhận giao dịch
        </DialogTitle>
        <DialogContent dividers>
          <div className="agent-details">
            <h5>Nghĩa vụ bên bán</h5>
            <ol className="address-list">
              <li>
                a) Chuyển giao đất, tài sản gắn liền với đất cho bên B đủ diện
                tích, đúng hạng đất, loại đất, vị trí, số hiệu, tình trạng đất
                và tài sản gắn liền với đất như đã thoả thuận;
              </li>
              <li>
                b) Giao giấy tờ có liên quan đến quyền sử dụng đất, quyền sở hữu
                tài sản gắn liền với đất cho bên B.
              </li>
            </ol>
          </div>
          <div className="agent-details">
            <h5>Cam đoan của bên bán</h5>
            <ol className="address-list">
              <li>
                a) Những thông tin về nhân thân, về thửa đất và tài sản gắn liền
                với đất đã ghi trong Hợp đồng này là đúng sự thật;
              </li>
              <li>
                b) Thửa đất thuộc trường hợp được chuyển nhượng quyền sử dụng
                đất theo quy định của pháp luật;
              </li>
              <li>
                c) Tại thời điểm giao kết Hợp đồng này: Thửa đất và tài sản gắn
                liền với đất không có tranh chấp, Quyền sử dụng đất và các tài
                sản gắn liền với đất không bị kê biên để bảo đảm thi hành án;
              </li>
              <li>
                d) Việc giao kết Hợp đồng này hoàn toàn tự nguyện, không bị lừa
                dối, không bị ép buộc;
              </li>
              <li>
                e) Thực hiện đúng và đầy đủ các thoả thuận đã ghi trong Hợp đồng
                này.
              </li>
            </ol>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleClose();
              props.confirmTransactionRequest(props.transaction);
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

// };

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmTransactionRequest: (idTransaction) => {
      dispatch(confirmTransactionRequest(idTransaction));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTransaction);
