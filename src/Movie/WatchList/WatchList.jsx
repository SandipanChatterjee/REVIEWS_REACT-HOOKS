/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Login from "../../Auth/Login/Login";
import axios from "../../eaxios";
import { auth } from "../../store/actions/auth";
import { LoadingSpinner } from "../../utils";
import "./WatchList.css";

let userId = null;
let token = null;

const WatchList = (props) => {
  const [watchList, setWatchList] = useState(() => false);
  const [loading, setLoading] = useState(() => false);
  const [showLoginModal, setShowLoginModal] = useState(() => false);
  const [watchListHandlerFlag, setwatchListHandlerFlag] = useState(() => false);
  let reviewsWatchListId = null;

  const loginModalHandler = () => {
    setShowLoginModal(true);
  };

  const watchListHandler = () => {
    if (token) {
      setLoading(true);
      setwatchListHandlerFlag(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const setWatchListHandler = (watchList) => {
    if (watchList && watchList.length > 0) {
      for (let el of watchList) {
        if (props.movieId === el.movie) {
          reviewsWatchListId = el._id;
          sessionStorage.setItem("Reviews.watchListId", reviewsWatchListId);
          if (el.watchList) {
            setWatchList(true);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
    }
  };

  const getWatchList = async () => {
    let userId = localStorage.getItem("Reviews.UserId");
    if (userId) {
      try {
        const res = await axios.get(`api/v1/user/${userId}/watchlist`);
        return res.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  };
  const initWatchList = async () => {
    const watchList = await getWatchList();
    setWatchListHandler(watchList);
  };

  useEffect(() => {
    if (watchListHandlerFlag) {
      const watchListHandler2 = async () => {
        console.log("watchListHandler2", "userId", userId);
        try {
          let watchlistId = sessionStorage.getItem("Reviews.watchListId");
          let res;
          if (watchList) {
            let param = { watchList: !watchList };
            res = await axios.put(`api/v1/watchlist/${watchlistId}`, param);
          } else {
            let param = {
              watchList: true,
              movie: props.movieId,
            };
            console.log("param#", param);
            res = await axios.post(`api/v1/user/${userId}/watchlist`, param);
          }
          console.log("watchListHandler2###");
          setWatchList(res.data.data.watchList);
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
        setwatchListHandlerFlag(false);
      };
      watchListHandler2();
    }
  }, [watchListHandlerFlag]);

  useEffect(() => {
    userId = localStorage.getItem("Reviews.UserId");
    token = localStorage.getItem("Reviews.token");
  });

  useEffect(() => {
    if (userId) {
      setLoading(true);
    }
    initWatchList();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="watchlist-button">
      {watchList ? (
        <p
          className="txt"
          onClick={watchListHandler}
          data-test="addedToWatchList"
        >
          <span className="icon-container-1">
            {" "}
            <FontAwesomeIcon
              icon={faCheck}
              className="icon icon-modified"
              size="1x"
            />
          </span>{" "}
          Added to watchlist
        </p>
      ) : (
        <p className="txt" onClick={watchListHandler}>
          {" "}
          <span className="icon-container-1">
            {" "}
            <FontAwesomeIcon
              icon={faPlus}
              className="icon icon-modified"
              size="1x"
            />
          </span>{" "}
          Add to watchlist
        </p>
      )}
      {showLoginModal ? (
        <Login
          showLoginModal={showLoginModal}
          loginModalHandler={loginModalHandler}
          onLogin={props.onLogin}
          loading={props.loading}
          error={props.error}
        />
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.Auth.loading === true,
    error: state.Auth.error,
    token: state.Auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (data, type) => dispatch(auth(data, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
