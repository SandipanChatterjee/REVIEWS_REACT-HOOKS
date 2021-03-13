import React, { Component } from "react";
import List from "./List/List";
import axios from "../eaxios";
import { LoadingSpinner } from "../utils";

export class Rating extends Component {
  state = {
    ratingList: [],
    movieList: [],
    loader: false,
    rating: null,
  };
  getMovies = async (id) => {
    try {
      let movie = await axios.get(`api/v1/movies/${id}`);
      return movie.data.data;
    } catch (e) {
      console.log(e.message);
    }
  };
  getRatingList = async () => {
    let userID = localStorage.getItem("Reviews.UserId");
    try {
      let ratingList = await axios.get(`api/v1/user/${userID}/rating`);
      return ratingList.data.data;
    } catch (e) {
      console.log(e.message);
    }
  };
  async componentDidMount() {
    this.setState(
      {
        loader: true,
      },
      async () => {
        const ratingList = await this.getRatingList();
        const movies = [];
        for (let el of ratingList) {
          let movie = await this.getMovies(el.movie);
          movies.push(movie);
        }
        this.setState({
          movieList: movies,
          loader: false,
          rating: ratingList.map((el) => el.rating),
        });
        console.log("movies###", movies);
      }
    );
  }
  render() {
    if (this.state.loader) {
      return (
        <div className="loading">
          <LoadingSpinner />
        </div>
      );
    }
    return (
      <div>
        <List
          listname="YOUR RATINGS"
          movieList={this.state.movieList}
          rating={this.state.rating}
          name="RATINGS"
        />{" "}
      </div>
    );
  }
}

export default Rating;
