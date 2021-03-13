/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Loader from "react-loader-spinner";
import { useLocation } from "react-router-dom";

export const location = () => {
  return useLocation();
};

export const LoadingSpinner = () => {
  return <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />;
};

export const baseURL = "https://imdb-demo-backend.herokuapp.com/";

export const convertDate = (inputFormat) => {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
};

export const year = (date) => {
  const dt = new Date(date);
  const year = dt.getFullYear();
  return year;
};

export const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};
