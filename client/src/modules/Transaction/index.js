import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import Info from "./sections/1_info";
import DepositContract from "./sections/2_deposit_contract";
import DepositPayment from "./sections/3_deposit_payment";
import DepositConfirm from "./sections/4_deposit_confirm";
import TransferContract from "./sections/5_transfer_contract";
import PaymentConfirm from "./sections/6_payment_confirm";
import PayTaxes from "./sections/7_pay_taxes";
import TaxesComfirm from "./sections/8_taxes_confirm";
import Finished from "./sections/9_finished";

import { fetchTransactionRequest } from "./action";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const CustomizedExpansionPanels = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const idTransaction = props.match.params.idTransaction;
  useEffect(() => {
    props.fetchTransaction(idTransaction);
  }, []);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="container mt-85 mb-100">
      <h3>Quá trình giao dịch tài sản</h3>
      <ExpansionPanel
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography style={{ color: "green" }}>
            Thông tin giao dịch {""}
            <i className="far fa-check-circle" style={{ color: "green" }}></i>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {expanded === "panel1" && <Info match={props.match} />}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography>Tạo hợp đồng đặt cọc</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {expanded === "panel2" && <DepositContract />}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography>Đăng hợp đồng đặt cọc</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <DepositPayment />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          aria-controls="panel4d-content"
          id="panel4d-header"
        >
          <Typography>Tạo hợp đồng chuyển nhượng</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {expanded === "panel4" && <TransferContract />}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <ExpansionPanelSummary
          aria-controls="panel5d-content"
          id="panel5d-header"
        >
          <Typography>Đăng hợp đồng chuyển nhượng</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <DepositConfirm />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <ExpansionPanelSummary
          aria-controls="panel6d-content"
          id="panel6d-header"
        >
          <Typography>Kê khai thuế</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <PaymentConfirm />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <ExpansionPanelSummary
          aria-controls="panel7d-content"
          id="panel7d-header"
        >
          <Typography>Đóng thuế nhà nước</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <PayTaxes />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <ExpansionPanelSummary
          aria-controls="panel8d-content"
          id="panel8d-header"
        >
          <Typography>Xác nhận đóng thuế</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TaxesComfirm />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        disabled
        square
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <ExpansionPanelSummary
          aria-controls="panel9d-content"
          id="panel9d-header"
        >
          <Typography>Kết thúc</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Finished />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTransaction: (idTransaction) => {
      dispatch(fetchTransactionRequest(idTransaction));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizedExpansionPanels);
