import React, { Component } from "react";
import ReactPlayer from "react-player";
import axios from "../../eaxios";
import Error from "../../Error/Error";
import { baseURL, LoadingSpinner } from "../../utils";
import "./MovieTrailer.css";

class MovieTrailer extends Component {
  error = null;
  state = {
    loading: false,
    trailer: {},
  };
  getTrailer = async (id) => {
    console.log("id #", id);
    try {
      const trailer = await axios.get(`api/v1/reviews/${id}/trailers`);
      return trailer.data.data;
    } catch (e) {
      this.error = e.message;
    }
  };
  componentDidMount() {
    // const reviewId = sessionStorage.getItem("Reviews.ID");
    const { reviewId } = this.props;
    this.setState(
      {
        loading: true,
      },
      async () => {
        const trailer = await this.getTrailer(reviewId);
        this.setState({
          trailer,
          loading: false,
        });
      }
    );
  }
  render() {
    const { trailer, loading } = this.state;
    if (this.error) {
      return <Error error={this.error} />;
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
        {trailer !== {} ? (
          <ReactPlayer
            url={baseURL + trailer.movieTrailer}
            width="100%"
            controls={true}
          />
        ) : null}
      </div>
    );
  }
}

export default MovieTrailer;
