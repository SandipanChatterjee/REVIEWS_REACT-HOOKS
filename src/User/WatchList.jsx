import React, { Component } from "react";
import axios from "../eaxios";
import List from "./List/List";
import { LoadingSpinner } from "../utils";
class WatchList extends Component {
  state = {
    watchList: [],
    movieList: [],
    loader: false,
  };
  getMovies = async (id) => {
    try {
      let movie = await axios.get(`api/v1/movies/${id}`);
      return movie.data.data;
    } catch (e) {
      console.log(e.message);
    }
  };
  getWatchList = async () => {
    let userID = localStorage.getItem("Reviews.UserId");
    try {
      let watchList = await axios.get(`api/v1/user/${userID}/watchlist`);
      return watchList.data.data;
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
        const watchList = await this.getWatchList();
        const movies = [];
        for (let el of watchList) {
          //   console.log("watchList###", el.watchList);
          if (el.watchList) {
            let movie = await this.getMovies(el.movie);
            movies.push(movie);
          }
        }
        this.setState({
          movieList: movies,
          loader: false,
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
          listname="YOUR WATCHLIST"
          movieList={this.state.movieList}
          name="Watchlist"
        />{" "}
      </div>
    );
  }
}

export default WatchList;
