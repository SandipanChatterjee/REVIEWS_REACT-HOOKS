/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState, useRef } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "../eaxios";
import { convertDate, isEmptyObj, LoadingSpinner, year } from "../utils";
import "./MovieMaster.css";
import MovieMasterModal from "./MovieMasterModal";
import MoviePicture from "./Photo/MoviePicture";
import MovieRating from "./Rating/MovieRating";
import MovieTrailer from "./Video/MovieTrailer";
import WatchList from "./WatchList/WatchList";
import { location } from "../utils";

const MovieMaster = (props) => {
  const [movie, setMovie] = useState({});
  const [casts, setCasts] = useState(() => []);
  const [loading, setLoading] = useState(() => true);
  const [showRating, setShowRating] = useState(() => false);
  const [showMovieMasterModal, setMovieMasterModal] = useState(() => false);
  const [rating, setRating] = useState(() => null);
  const [ratingMsg, setRatingMsg] = useState(() => "");
  const [ratingLoader, setRatingLoader] = useState(() => false);
  const [reviewId, setReviewId] = useState(() => null);
  const isFirstRun = useRef(true);

  let errorMsg = null;
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const setRateing = async () => {
      const obj = {
        rating,
      };
      try {
        await axios.post(`/api/v1/movies/${movie._id}/rating`, obj);
        const movieData = await getMoview(reviewId);
        setMovieMasterModal(true);
        setRatingMsg("You have successfully rated this movie");
        setMovie(movieData);
        setRatingLoader(false);
        setShowRating(false);
      } catch (e) {
        setMovieMasterModal(true);
        setRatingMsg(
          e.response.data.error.startsWith("E11000")
            ? "You have already rated this movie"
            : e.response.data.error
        );
        setRatingLoader(false);
        setShowRating(false);
      }
    };
    setRateing();
  }, [rating]);

  const ratingHandler = async (rating) => {
    console.log("rating##", rating);
    setRatingLoader(true);
    setRating(rating);
  };

  const displayCasts = (param) => {
    if (!isEmptyObj(movie)) {
      console.log("displayCasts##", param, movie);
      setCasts(movie.members.casts.slice(0, param));
    }
  };

  const getMoview = async (id) => {
    // console.log("id##", id);
    try {
      const movie = await axios.get(`api/v1/reviews/${id}/movies`);
      return movie.data.data;
    } catch (e) {
      errorMsg = e.message;
    }
  };

  const fetchInitMovie = async (reviewId) => {
    // console.log("fetchInitMovie");
    const movieData = await getMoview(reviewId);
    setMovie((prevState) => {
      return { ...prevState, ...movieData };
    });
    setReviewId(reviewId);
    setLoading(false);
  };

  const getReviewId = () => {
    return props.match.params.id;
  };

  useEffect(() => {
    console.log("useEffect#2");
    const reviewId = getReviewId();
    fetchInitMovie(reviewId);
  }, [location.search]);

  useEffect(() => {
    if (!isEmptyObj(movie)) setCasts(movie.members.casts.slice(0, 3));
  }, [movie]);

  const showRatingHandler = () => {
    setShowRating(!showRating);
  };

  if (errorMsg !== null) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return (
      <span className="loading" data-test="movieMasterLoading">
        <LoadingSpinner />
      </span>
    );
  }

  if (isEmptyObj(movie)) {
    props.history.goBack();
  }

  return (
    <div data-test="movieMasterComponent">
      <div className="container">
        <div className="item">
          <span className="movie-title">
            <div>
              <p style={{ color: "fff" }}>
                {movie.title} ({year(movie.dateOfRelease)})
              </p>
              <span className="movie-desc">
                <p className="movie-desc-p1">{movie.parentalGuidelines[0]}</p>
                {" | "}
                <p className="movie-desc-p2">{movie.runtime} </p>
                {" | "}
                <span className="genre">
                  {movie.genre.length !== 0
                    ? movie.genre.map((item, index, arr) => (
                        <p key={index} className="movie-items">
                          {index !== arr.length - 1 ? `${item + ","}` : item}
                        </p>
                      ))
                    : null}
                </span>
                {" | "}
                <p className="movie-desc-p2">
                  {convertDate(movie.dateOfRelease)}
                </p>
              </span>
            </div>

            <span className="icon-container movie-master-icon-container">
              <span>
                <FontAwesomeIcon icon={faStar} className="icon" size="xs" />
              </span>
              <p className="average-rating">
                {movie.averageRating + "/" + 10}
                <p className="users-rated">({movie.usersRated} USERS )</p>
              </p>
              {
                <span className="icon-container empty-icon-conatiner">
                  {ratingLoader ? (
                    <LoadingSpinner className="loading" />
                  ) : (
                    <Fragment>
                      {/* {console.log("showRating##", showRating)} */}
                      {showRating ? (
                        <MovieRating
                          getRating={ratingHandler}
                          showRating={showRatingHandler}
                        />
                      ) : null}
                      <span
                        style={{ display: "flex" }}
                        onClick={showRatingHandler}
                      >
                        <span>
                          <FontAwesomeIcon icon={faStar} size="xs" />
                        </span>
                        <p
                          style={{
                            fontSize: ".7rem",
                            marginTop: ".7rem",
                            marginLeft: ".2rem",
                          }}
                        >
                          Rate <br /> This
                        </p>
                      </span>
                    </Fragment>
                  )}
                </span>
              }
            </span>
          </span>
          <div>
            {showMovieMasterModal ? (
              <MovieMasterModal
                message={ratingMsg}
                closeModal={() => setMovieMasterModal(false)}
                showModal={showMovieMasterModal}
              />
            ) : null}
          </div>
          <MovieTrailer reviewId={reviewId} />
          <span>
            <p className="story">Story: {movie.story}</p>
          </span>
          <span>
            <p>Creator: {movie.members.creator}</p>
            {movie.members.casts.length !== 0 ? (
              <span className="casts">
                <span>Casts</span>:{" "}
                {casts.map((name, index, arr) => (
                  <p key={index}>
                    {index < arr.length - 1 ? `${name + ","}` : name}
                  </p>
                ))}
                <span
                  onClick={() =>
                    displayCasts(
                      casts.length !== movie.members.casts.length
                        ? movie.members.casts.length
                        : 3
                    )
                  }
                  className="more"
                >
                  {casts.length !== movie.members.casts.length
                    ? "Show More"
                    : "Show Less"}
                </span>
              </span>
            ) : null}
          </span>
          <div>
            {!props.authLoading ? (
              <WatchList movieId={movie._id} />
            ) : (
              <LoadingSpinner />
            )}
          </div>
          <div className="movie-picture">
            <MoviePicture photos={movie.photos} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authLoading: state.Auth.loading === true,
  };
};
export default connect(mapStateToProps)(MovieMaster);
