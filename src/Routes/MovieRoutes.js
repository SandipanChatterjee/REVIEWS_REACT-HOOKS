import loadable from "@loadable/component";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LoadingSpinner } from "../utils";
// import NotFound from "../NotFound";
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
const MovieMaster = loadable(() => import("../Movie/MovieMaster"), {
  fallback: fallbackComponent,
});
export const MovieRoutes = () => {
  return (
    <Switch>
      <Route path="/home/movie/:id" exact component={MovieMaster} />
      <Redirect to="/home/movie/:id" />
    </Switch>
  );
};
