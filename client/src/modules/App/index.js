import React, { Component } from "react";
import styles from "./styles.js";
import { withStyles } from "@material-ui/core";
import { Provider } from "react-redux";
import createStore from "../../store/createStore";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import Header from "../../components/Header/Header";
import FixedNotification from "../../components/FixedNotification";

const store = createStore();

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          {this.showContentMenus(routes)}
          <FixedNotification />
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
