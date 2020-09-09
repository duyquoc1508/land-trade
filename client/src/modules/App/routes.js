import React from "react";
import HomePage from "../HomePage";
import Listings from "../Listings";
import Property from "../Property";
import AddProperty from "../Property/AddProperty";
// import ListProperties from "../Property/ListProperties";
import TabListProperties from "../Property/ListProperties/tab";
import EditProperty from "../Property/EditProperty";
import Profile from "../Profile";
import EditProfile from "../Profile/EditProfile";
import Role from "../Role";
import PropertyStandard from "../Property/PropertyStandard";
import ConfirmProperty from "../Property/ConfirmProperty";
import InitTransaction from "../InitTransaction";
import NotFound from "../NotFound";
// import TradeContract from "../Transaction/sections/TradeContract";
import Transaction from "../Transaction";
import ManagementUser from "../ManagementUser";
import VerifyAccount from "../ManagementUser/verifyAccount";
import Notification from "../Notification";
import MyTransactions from "../MyTransactions";
import TransactionProperty from "../Property/TransactionProperty";
import TransactionDetail from "../TransactionDetail";
import Investing from "../Investing";
import ManagementCertificate from "../ManagementCertificate";

const routes = [
  {
    path: "/",
    exact: true,
    main: ({ match, history }) => <HomePage match={match} history={history} />,
  },
  {
    path: "/notification",
    exact: true,
    main: ({ match, history }) => (
      <Notification match={match} history={history} />
    ),
  },
  {
    path: "/listings",
    exact: true,
    main: ({ match, history }) => <Listings match={match} history={history} />,
  },

  {
    path: "/investing",
    exact: true,
    main: ({ match, history }) => <Investing match={match} history={history} />,
  },
  {
    path: "/my-transactions",
    exact: true,
    main: ({ match, history }) => (
      <MyTransactions match={match} history={history} />
    ),
  },

  {
    path: "/transactions-of-property/:hash/:idPropertyInBlockchain",
    exact: true,
    main: ({ match, history }) => (
      <TransactionProperty match={match} history={history} />
    ),
  },
  {
    path: "/property/:hash",
    exact: true,
    main: ({ match, history }) => <Property match={match} history={history} />,
  },
  {
    path: "/add-property",
    exact: true,
    main: ({ history }) => <AddProperty history={history} />,
  },
  {
    path: "/property-standard/:hash",
    exact: true,
    main: ({ match, history }) => (
      <PropertyStandard match={match} history={history} />
    ),
  },
  {
    path: "/my-property/edit/:hash",
    exact: true,
    main: ({ match, history }) => (
      <EditProperty match={match} history={history} />
    ),
  },
  {
    path: "/my-property/confirm/:hash/:idInBlockchain",
    exact: true,
    main: ({ match, history }) => (
      <ConfirmProperty match={match} history={history} />
    ),
  },
  {
    path: "/user/profile",
    exact: true,
    main: () => <Profile />,
  },
  {
    path: "/user/profile/edit",
    exact: true,
    main: ({ match, history }) => (
      <EditProfile match={match} history={history} />
    ),
  },
  {
    path: "/my-properties/",
    exact: true,
    main: ({ match, history }) => (
      <TabListProperties match={match} history={history} />
    ),
  },
  {
    path: "/transaction-detail/:txHash",
    exact: true,
    main: ({ match, history }) => (
      <TransactionDetail match={match} history={history} />
    ),
  },
  {
    path: "/create-transaction/:transactionHash",
    exact: true,
    main: ({ match, history }) => (
      <InitTransaction match={match} history={history} />
    ),
  },
  {
    path: "/role",
    exact: true,
    main: () => <Role />,
  },
  // {
  //   path: "/trade-contract",
  //   exact: false,
  //   main: () => <TradeContract />,
  // },
  {
    path: "/transaction/:transactionHash",
    exact: false,
    main: ({ match, history }) => (
      <Transaction match={match} history={history} />
    ),
  },
  {
    path: "/management-user",
    exact: false,
    main: () => <ManagementUser />,
  },

  {
    path: "/certification",
    exact: false,
    main: () => <ManagementCertificate />,
  },
  {
    path: "/verify-account",
    exact: false,
    main: ({ match, history }) => (
      <VerifyAccount match={match} history={history} />
    ),
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;
