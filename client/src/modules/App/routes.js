import React from "react";
import HomePage from "../HomePage";
import Listings from "../Listings";
import Property from "../Property";
import AddProperty from "../Property/AddProperty";
import ListProperties from "../Property/ListProperties";
import Profile from "../Profile";
import EditProfile from "../Profile/EditProfile";
import Transaction from "../Transaction";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />
  },
  {
    path: "/listings",
    exact: true,
    main: () => <Listings />
  },
  {
    path: "/property",
    exact: true,
    main: () => <Property />
  },
  {
    path: "/add-property",
    exact: true,
    main: ({ history }) => <AddProperty history={history} />
  },
  {
    path: "/user/profile",
    exact: true,
    main: () => <Profile />
  },
  {
    path: "/user/profile/edit",
    exact: true,
    main: () => <EditProfile />
  },
  {
    path: "/user/my-properties",
    exact: true,
    main: () => <ListProperties />
  },
  {
    path: "/transaction",
    exact: true,
    main: () => <Transaction />
  }
  // {
  //   path: "",
  //   exact: false,
  //   main: () => <NotFoundPage />
  // }
];

export default routes;
