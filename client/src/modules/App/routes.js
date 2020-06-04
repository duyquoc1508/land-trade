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
import NotFound from "../NotFound";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: "/listings",
    exact: true,
    main: () => <Listings />,
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
    path: "/transaction",
    exact: true,
    main: () => <Transaction />,
  },
  {
    path: "/role",
    exact: true,
    main: () => <Role />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  }
];

export default routes;
