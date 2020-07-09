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
const Payment = (props) => {
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
          <h5>Giá trị giao dịch</h5>
          <ul className="address-list">
            <li>
              <span>Số tiền chuyển:</span>
              {formatCurrency(
                convertWeiToVND(
                  props.transaction.transferPrice -
                    props.transaction.depositPrice
                )
              )}{" "}
              VNĐ
            </li>
            <li>
              <span>Thuế trước bạ:</span>
              {formatCurrency(
                convertWeiToVND(props.transaction.transferPrice * 0.005)
              )}{" "}
              VNĐ
            </li>
            <li>
              <span>Tổng số tiền chuyển:</span>
              {formatCurrency(
                convertWeiToVND(
                  props.transaction.transferPrice -
                    props.transaction.depositPrice +
                    props.transaction.transferPrice * 0.005
                )
              )}{" "}
              VNĐ
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
            <li>
              Bạn có thể hủy giao dịch nếu người bán chưa xác nhận và mất tiền
              đặt cọc
            </li>
          </ul>
        </div>

        {props.transaction.state == "DEPOSIT_CONFIRMED" && !props.checkExpired && (
          <button
            className="btn v3 float-right mt-5 "
            onClick={handleClickOpen}
          >
            <i className="ion-android-cancel"></i> Chuyển số tiền còn lại
          </button>
        )}
      </div>
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
            <h5>Nghĩa vụ bên mua</h5>
            <ol className="address-list">
              <li>
                a) Trả đủ tiền, đúng thời hạn và đúng phương thức đã thoả thuận
                cho bên bán;
              </li>
              <li>
                b) Đăng ký quyền sử dụng đất, quyền sở hữu tài sản gắn liền với
                đất theo quy định của pháp luật về đất đai;
              </li>
              <li>
                c) Bảo đảm quyền của người thứ ba đối với đất chuyển nhượng;
              </li>
              <li>
                d) Thực hiện các nghĩa vụ khác theo quy định của pháp luật về
                đất đai
              </li>
            </ol>
          </div>
          <div className="agent-details">
            <h5>Cam đoan của bên mua</h5>
            <ol className="address-list">
              <li>
                a) Những thông tin về nhân thân đã ghi trong Hợp đồng này là
                đúng sự thật;
              </li>
              <li>
                b) Đã xem xét kỹ, biết rõ về thửa đất và tài sản gắn liền với
                đất nêu tại Điều 1 của Hợp đồng này và các giấy tờ về quyền sử
                dụng đất, quyền sở hữu tài sản gắn liền với đất;
              </li>
              <li>
                c) Việc giao kết Hợp đồng này hoàn toàn tự nguyện, không bị lừa
                dối, không bị ép buộc;
              </li>
              <li>
                d) Thực hiện đúng và đầy đủ các thoả thuận đã ghi trong Hợp đồng
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
