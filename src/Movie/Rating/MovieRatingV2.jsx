import React, { Component } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Login } from "../../Auth/Login/Login";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";
class MovieRating extends Component {
  state = {
    rating: 0,
    hover: null,
    showLoginModal: false,
  };
  loginModalHandler = () => {
    this.setState({ showLoginModal: false }, () => {
      console.log(this.state.showLoginModal);
    });
  };
  ratingHanlder = (ratingValue) => {
    let token = localStorage.getItem("Reviews.token");
    if (!token) {
      this.setState({ showLoginModal: true });
    } else {
      this.setState({ rating: ratingValue }, () => {
        this.props.getRating(this.state.rating);
      });
    }
  };
  render() {
    const { showLoginModal } = this.state;
    let token = localStorage.getItem("Reviews.token");
    return (
      <div>
        {[...Array(10)].map((el, index) => {
          const ratingValue = index + 1;
          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                className="radio-btn"
                onClick={() => this.ratingHanlder(ratingValue)}
              />
              <FontAwesomeIcon
                icon={faStar}
                size="xs"
                onMouseEnter={() => this.setState({ hover: ratingValue })}
                onMouseLeave={() => this.setState({ hover: null })}
                color={
                  ratingValue <= (this.state.hover || this.state.rating)
                    ? "#f5c593"
                    : "#fff"
                }
              />{" "}
            </label>
          );
        })}
        <span style={{ fontSize: "2rem" }}>
          ({this.state.hover || this.state.rating} /10)
        </span>
        {showLoginModal ? (
          <Login
            showLoginModal={showLoginModal}
            loginModalHandler={this.loginModalHandler}
            onLogin={this.props.onLogin}
            loading={this.props.loading}
            error={this.props.error}
            token={token}
            showRating={this.props.showRating}
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
export default connect(mapStateToProps, mapDispatchToProps)(MovieRating);
