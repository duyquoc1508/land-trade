import React from "react";
import HomePage from "../HomePage";
import Listings from "../Listings";
import Property from "../Property";
import AddProperty from "../AddProperty";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />
  },
  {
    path: "/listings",
    exact: false,
    main: () => <Listings />
  },
  {
    path: "/property",
    exact: false,
    main: () => <Property />
  },
  {
    path: "/add-property",
    exact: false,
    main: ({ history }) => <AddProperty history={history} />
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
