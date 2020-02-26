import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import * as actions from "../actions";

import OwnersForm from "./owners";
import LandForm from "./land";
import HouseForm from "./house";
import ConstructionForm from "./construction";
import ForestFrom from "./forest";
import TreeForm from "./tree";
import NoteForm from "./note.js";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return [
    "Chủ sở hữu",
    "Thửa đất",
    "Nhà ở",
    "Công trình xây dựng khác",
    "Rừng sản xuất là rừng trồng",
    "Cây lâu năm",
    "Ghi chú"
    // "Thêm hình ảnh"
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <OwnersForm />;
    case 1:
      return <LandForm />;
    case 2:
      return <HouseForm />;
    case 3:
      return <ConstructionForm />;
    case 4:
      return <ForestFrom />;
    case 5:
      return <TreeForm />;
    case 6:
      return <NoteForm />;
    default:
      return "Unknown step";
  }
}

const tab = function HorizontalNonLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    props.handleClick(props.form);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleSubmit = () => {
    // console.log(props.addProperty);
    props.createSubmit(props.addProperty.data);
  };

  return (
    <div className={classes.root}>
      <div>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
                completed={completed[index]}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className={classes.boxFrom}>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {"Đăng Ký"}
            </Button>
          </div>
        ) : (
          <div>
            {/* <Typography className={classes.instructions}> */}
            <div className={classes.instructions}>
              {getStepContent(activeStep)}
            </div>
            {/* </Typography> */}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                  >
                    {"Complete Step"}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  addProperty: state.addProperty,
  form: state.form
});

const mapDispatchToProps = dispatch => {
  return {
    handleClick: data => {
      dispatch(actions.fillForm(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(tab);