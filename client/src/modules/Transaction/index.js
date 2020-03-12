import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import Info from "./sections/1_info";
import Contract from "./sections/2_contract";
import DepositPayment from "./sections/3_deposit_payment";
import DepositConfirm from "./sections/4_deposit_confirm";
import Payment from "./sections/5_payment";
import PaymentConfirm from "./sections/6_payment_confirm";
import PayTaxes from "./sections/7_pay_taxes";
import TaxesComfirm from "./sections/8_taxes_confirm";
import Finished from "./sections/9_finished";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, newExpanded) => {
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
            #1 Khởi tạo giao dịch {""}
            <i class="far fa-check-circle" style={{ color: "green" }}></i>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Info />
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
          <Typography>#2 Hợp đồng sang nhượng</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Contract />
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
          <Typography>#3 Thanh toán đặt cọc</Typography>
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
          <Typography>#4 Xác nhận thanh toán đặt cọc</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <DepositConfirm />
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
          <Typography>#5 Thanh toán</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Payment />
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
          <Typography>#6 Xác nhận thanh toán</Typography>
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
          <Typography>#7 Đóng thuế nhà nước</Typography>
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
          <Typography>#8 Xác nhận đóng thuế</Typography>
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
          <Typography>#9 Kết thúc</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Finished />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
