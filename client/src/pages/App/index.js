import React, { Component } from "react";
import styles from "./styles.js";
import { withStyles } from "@material-ui/core";
import { Provider } from "react-redux";
import createStore from "../../store/createStore";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import Header from "../../components/Header/Header";
import Web3 from "web3";

const store = createStore();

class Index extends Component {
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async componentDidMount() {
    await this.loadWeb3();
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          {this.showContentMenus(routes)}
        </Router>
      </Provider>
    );
  }

  showContentMenus = routes => {
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
