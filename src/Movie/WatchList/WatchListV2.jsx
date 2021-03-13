import React, { Component } from "react";
import "./WatchList.css";
import axios from "../../eaxios";
import { LoadingSpinner } from "../../utils";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Login } from "../../Auth/Login/Login";
import { auth } from "../../store/actions/auth";
import { connect } from "react-redux";
class WatchList extends Component {
  state = {
    watchList: false,
    watchListId: null,
    loading: false,
    showLoginModal: false,
  };
  loginModalHandler = () => {
    console.log("loginModalHandler Call");
    this.setState(
      {
        showLoginModal: false,
      },
      () => {
        console.log("from watchlist1###", this.state.showLoginModal);
      }
    );
  };
  watchListHandler = () => {
    let userId = localStorage.getItem("Reviews.UserId");
    let token = localStorage.getItem("Reviews.token");
    const { watchList } = this.state;
    if (token) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          try {
            let watchlistId = sessionStorage.getItem("Reviews.watchListId");
            let res;
            if (watchList) {
              let param = { watchList: !this.state.watchList };
              res = await axios.put(`api/v1/watchlist/${watchlistId}`, param);
            } else {
              let param = {
                watchList: true,
                movie: this.props.movieId,
              };
              res = await axios.post(`api/v1/user/${userId}/watchlist`, param);
            }
            this.setState({
              watchList: res.data.data.watchList,
              loading: false,
            });
          } catch (e) {
            this.setState({
              loading: false,
            });
          }
        }
      );
    } else {
      this.setState({
        showLoginModal: true,
      });
    }
  };
  setWatchList = (watchList) => {
    console.log("watchList####", watchList);
    if (watchList.length > 0) {
      for (let el of watchList) {
        if (this.props.movieId === el.movie) {
          if (el.watchList) {
            this.setState(
              {
                watchList: true,
                loading: false,
              },
              () => {
                sessionStorage.setItem("Reviews.watchListId", el._id);
              }
            );
          } else {
            this.setState({
              loading: false,
            });
          }
        } else {
          this.setState({
            loading: false,
          });
        }
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  };
  getWatchList = async () => {
    let userId = localStorage.getItem("Reviews.UserId");
    if (userId) {
      try {
        const res = await axios.get(`api/v1/user/${userId}/watchlist`);
        let len = res.data.data.length;
        return res.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  };
  async componentDidMount() {
    let userId = localStorage.getItem("Reviews.UserId");
    if (userId) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          const watchList = await this.getWatchList();
          this.setWatchList(watchList);
        }
      );
    }
  }
  render() {
    const { watchList, loading, showLoginModal } = this.state;
    // console.log("from watchlist2###", showLoginModal);
    if (loading) {
      return <LoadingSpinner />;
    }
    return (
      <div className="watchlist-button">
        {watchList ? (
          <p className="txt" onClick={this.watchListHandler}>
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
          <p className="txt" onClick={this.watchListHandler}>
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
            loginModalHandler={this.loginModalHandler}
            onLogin={this.props.onLogin}
            loading={this.props.loading}
            error={this.props.error}
            // showWatchList={this.props.showWatchList}
          />
        ) : null}
      </div>
    );
  }
}
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
