import loadable from "@loadable/component";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ResetPassword from "../Auth/ResetPassword/ResetPassword";
import { LoadingSpinner } from "../utils";
import WatchList from "../User/WatchList";
import Rating from "../User/Rating";
import { PrivateRoutes } from "../PrivateRoutes";
const fallbackComponent = () => {
  return (
    <span
      style={{
        position: "absolute",
        left: "48%",
        top: "45%",
      }}
    >
      <LoadingSpinner />
    </span>
  );
};
const Dashboard = loadable(() => import("../Dashboard/Dashboard"), {
  fallback: fallbackComponent,
});

export const DashboardRoutes = () => (
  <Switch>
    <PrivateRoutes path="/home/watchlist" exact component={WatchList} />
    <PrivateRoutes path="/home/rating" exact component={Rating} />
    <Route
      path="/api/v1/auth/resetpassword/:resettoken"
      component={ResetPassword}
    />
    <Route path="/home" exact component={Dashboard} />
    <Redirect to="/home" />
  </Switch>
);
