/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Login from "../../Auth/Login/Login";
import { auth } from "../../store/actions/auth";

let token = null;
const MovieRating = (props) => {
  const [rating, setRating] = useState(() => null);
  const [hover, setHover] = useState(() => null);
  const [showLoginModal, setShowLoginModal] = useState(() => false);

  const isFirstRun = useRef(true);

  const loginModalHandler = () => {
    setShowLoginModal(false);
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log("rating##");
    props.getRating(rating);
  }, [rating]);

  useEffect(() => {
    token = localStorage.getItem("Reviews.token");
  });

  const ratingHanlder = (ratingValue) => {
    // console.log("ratingHandler##", token);
    if (!token) {
      setShowLoginModal(true);
    } else {
      console.log("ratingHandler##", token);
      setRating(ratingValue);
    }
  };

  return (
    <div>
      {[...Array(10)].map((el, index) => {
        const ratingValue = index + 1;
        // console.log("ratingValue##", ratingValue);
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="radio-btn"
              onClick={() => ratingHanlder(ratingValue)}
            />
            <FontAwesomeIcon
              icon={faStar}
              size="xs"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              color={ratingValue <= (hover || rating) ? "#f5c593" : "#fff"}
            />{" "}
          </label>
        );
      })}
      <span style={{ fontSize: "2rem" }}>({hover || rating} /10)</span>
      {showLoginModal ? (
        <Login
          showLoginModal={showLoginModal}
          loginModalHandler={loginModalHandler}
          onLogin={props.onLogin}
          loading={props.loading}
          error={props.error}
          token={token}
          showRating={props.showRating}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.Auth.loading === true,
    error: state.Auth.error,
    // token: state.Auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (data, type) => dispatch(auth(data, type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieRating);
