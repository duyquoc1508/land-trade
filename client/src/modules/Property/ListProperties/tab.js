import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { requestFetch } from "./actions";
import ListProperties from "./list";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.handleClick();
  }, []);

  let listPending = props.myListing.filter(property => property.state === 0);
  let listActive = props.myListing.filter(property => property.state === 1);
  let listSale = props.myListing.filter(property => property.state === 2);
  return (
    <div className="container mt-75 mb-100">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="recent-activity my-listing">
            <div className="act-title">
              <h5>My Listings</h5>
            </div>
            <div className={classes.root}>
              <AppBar
                position="static"
                style={{ boxShadow: "none" }}
                color="inherit"
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Đã duyệt " {...a11yProps(0)} />
                  <Tab label="Chờ duyệt " {...a11yProps(1)} />
                  <Tab label="Đang bán " {...a11yProps(2)} />
                  <Tab label="Yêu thích " {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <ListProperties list={listPending} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ListProperties list={listActive} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ListProperties list={listSale} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ListProperties list={props.myListing} />
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  myListing: state.myListing
});

const mapDispatchToProps = dispatch => {
  return {
    handleClick: () => {
      console.log("test");
      dispatch(requestFetch());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollableTabsButtonAuto);
