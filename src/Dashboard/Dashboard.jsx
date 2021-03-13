import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../eaxios";
import { LoadingSpinner } from "../utils";
import "./Dashboard.css";

const Dashboard = () => {
  const [reviews, setReviews] = useState(() => []);
  const history = useHistory();

  function handleSubmit(review) {
    history.push(`/home/movie/${review._id}`);
  }

  const setReviewsHandler = async () => {
    const reviews = await axios.get(`/api/v1/reviews`);
    setReviews(reviews.data.data);
  };

  useEffect(() => {
    setReviewsHandler();
  }, []);

  return (
    <div>
      <Fragment>
        {" "}
        <div className="container" data-test="container">
          {reviews.length > 0 ? (
            reviews.map((el, index) => {
              const str = "https://imdb-demo-backend.herokuapp.com/";
              return (
                <Fragment key={index}>
                  <div className="items" onClick={() => handleSubmit(el)}>
                    <img
                      src={str + el.movieImg}
                      alt="movieImg"
                      className="movieImg"
                    />
                    <span className="ratingContainer">
                      <p>{el.movieTitle}</p>
                    </span>
                  </div>
                </Fragment>
              );
            })
          ) : (
            <span
              style={{
                position: "absolute",
                left: "48%",
                top: "45%",
              }}
            >
              <LoadingSpinner />
            </span>
          )}
        </div>
      </Fragment>
    </div>
  );
};

export default Dashboard;
