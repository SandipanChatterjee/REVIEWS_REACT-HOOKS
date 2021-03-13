import React, { Component, Fragment } from "react";
import { convertDate, year } from "../../utils";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import ErrorModal from "../../Auth/Error";
import "../../Movie/MovieMaster.css";
import "./List.css";
class List extends Component {
  state = {
    showErrorModal: false,
  };
  closeModal = () => {
    this.setState(
      {
        showErrorModal: false,
      },
      () => {
        this.props.history.push("/");
      }
    );
  };
  componentDidMount() {
    if (this.props.movieList.length === 0) {
      this.setState({
        showErrorModal: true,
      });
    }
  }
  render() {
    const { listname, movieList, name, rating } = this.props;
    const { showErrorModal } = this.state;
    if (movieList.length === 0) {
      return (
        <ErrorModal
          message={`Your ${name} is empty`}
          showModal={showErrorModal}
          closeModal={this.closeModal}
        />
      );
    }
    return (
      <div className="container">
        <div>
          <h2>{listname}</h2>
          <div>
            {movieList.map((movie, index) => {
              const story = movie.story.split(" ").slice(0, 30).join(" ");
              return (
                <Fragment>
                  <div className="list-item list-modified-item">
                    <div>
                      <img
                        src={process.env.REACT_APP_API_URL + movie.photos[0]}
                        alt="movieImg"
                        className="img"
                      />
                    </div>
                    <div>
                      <div className="item">
                        <span className="movie-title">
                          <p style={{ color: "fff" }}>
                            {movie.title} ({year(movie.dateOfRelease)})
                          </p>
                        </span>
                        <span className="movie-desc" style={{ width: "50%" }}>
                          <p className="movie-desc-p1">
                            {movie.parentalGuidelines[0]}
                          </p>
                          {" | "}
                          <p className="movie-desc-p2">{movie.runtime} </p>
                          {" | "}
                          <span className="genre">
                            {movie.genre.length !== 0
                              ? movie.genre.map((item, index, arr) => (
                                  <p key={index} className="movie-items">
                                    {index !== arr.length - 1
                                      ? `${item + ","}`
                                      : item}
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
                      <p>
                        <span>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="icon"
                            size="s"
                          />
                        </span>{" "}
                        <span>
                          {name === "RATINGS"
                            ? rating[index]
                            : movie.averageRating}
                        </span>
                      </p>
                      <p>{story + "..."}</p>
                      <span>
                        <p>Creator: {movie.members.creator}</p>
                        {movie.members.casts.length !== 0 ? (
                          <span className="casts">
                            <span>Casts</span>:{" "}
                            {movie.members.casts.map((name, index, arr) => (
                              <p key={index}>
                                {index < arr.length - 1
                                  ? `${name + ","}`
                                  : name}
                              </p>
                            ))}
                          </span>
                        ) : null}
                      </span>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

List.defaultProps = {
  movieList: [],
  rating: null,
};

export default withRouter(List);
