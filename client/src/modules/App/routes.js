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
import Transaction from "../Transaction";
import Role from "../Role";
import PropertyStandard from "../Property/PropertyStandard";
import ComfirmProperty from "../Property/ConfirmProperty";
import InitTransaction from "../InitTransaction";
import NotFound from "../NotFound";
import DownPaymentContract from "../Transaction/sections/DownPaymentContract";
import TradeContract from "../Transaction/sections/TradeContract";
import TransactionProcess from "../TransactionProcess";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: "/listings",
    exact: true,
    main: ({ match, history }) => <Listings match={match} history={history} />,
  },
  {
    path: "/property",
    exact: true,
    main: () => <Property />,
  },
  {
    path: "/add-property",
    exact: true,
    main: ({ history }) => <AddProperty history={history} />,
  },
  {
    path: "/property/:hash",
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
      <ComfirmProperty match={match} history={history} />
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
    main: () => <TabListProperties />,
  },
  {
    path: "/transaction/:txHash",
    exact: true,
    main: ({ match, history }) => (
      <Transaction match={match} history={history} />
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
  {
    path: "/down-payment-contract",
    exact: false,
    main: () => <DownPaymentContract />,
  },
  {
    path: "/trade-contract",
    exact: false,
    main: () => <TradeContract />,
  },

  {
    path: "/transaction-process/:transactionHash",
    exact: false,
    main: ({ match, history }) => (
      <TransactionProcess match={match} history={history} />
    ),
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;
