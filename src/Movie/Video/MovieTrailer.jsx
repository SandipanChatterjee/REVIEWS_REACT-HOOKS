/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "../../eaxios";
import Error from "../../Error/Error";
import { baseURL, LoadingSpinner, isEmptyObj } from "../../utils";
import "./MovieTrailer.css";

let error = null;

const MovieTrailer = (props) => {
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState({});

  const getTrailer = async (id) => {
    console.log("id #", id);
    try {
      const trailer = await axios.get(`api/v1/reviews/${id}/trailers`);
      return trailer.data.data;
    } catch (e) {
      error = e.message;
    }
  };

  useEffect(() => {
    if (loading) {
      (async () => {
        const { reviewId } = props;
        const trailer = await getTrailer(reviewId);
        setTrailer((prevState) => {
          return { ...prevState, ...trailer };
        });
        setLoading(false);
      })();
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
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
  }
  return (
    <div>
      {!isEmptyObj(trailer) ? (
        <ReactPlayer
          url={baseURL + trailer.movieTrailer}
          width="100%"
          controls={true}
        />
      ) : null}
    </div>
  );
};

export default MovieTrailer;
