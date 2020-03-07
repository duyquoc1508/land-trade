import React from "react";
import HomePage from "../HomePage";
import Listings from "../Listings";
import Property from "../Property";
import AddProperty from "../Property/AddProperty";
import Profile from "../Profile";
import EditProfile from "../Profile/EditProfile";

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
  }
  // {
  //   path: "/product/:id/edit",
  //   exact: false,
  //   main: ({ match, history }) => (
  //     <ProductActionPage match={match} history={history} />
  //   )
  // },
  // {
  //   path: "",
  //   exact: false,
  //   main: () => <NotFoundPage />
  // }
];

export default routes;
