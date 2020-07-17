import React, { Component } from "react";
import styles from "./styles.js";
import { withStyles } from "@material-ui/core";
import { Provider } from "react-redux";
import createStore from "../../store/createStore";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import Header from "../../components/Header/Header";
import FixedNotification from "../../components/FixedNotification";
import ErrorWeb3 from "../../components/Web3/ErrorWeb3";

const store = createStore();

class Index extends Component {
  render() {
    const web3 = window.web3;
    return !web3 ? (
      <ErrorWeb3 /> // detect using a web3-capable browser
    ) : (
      <Provider store={store}>
        <Router>
          {/*add <Header/> to Route for access history, location, match from <Header/> */}
          <Route component={Header} />
          {this.showContentMenus(routes)}
          <div className="pb-30"></div>
          <Route component={FixedNotification} />
        </Router>
      </Provider>
    );
  }

  showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

export default withStyles(styles)(Index);
