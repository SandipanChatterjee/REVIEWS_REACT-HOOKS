import React, { Component, Fragment } from "react";
import UserDetails from "../User/UserDetails";
import "./Dashboard.css";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import { logout } from "../store/actions/auth";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { baseURL, LoadingSpinner } from "../utils";
import Autosuggest from "react-autosuggest";
import axios from "../eaxios";
import ErrorModal from "../Auth/Error";
import imdbImg from "../Assests/imdb.png";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      showRegisterModal: false,
      showLoginModal: false,
      showForgotPasswordModal: false,
      token: null,
      value: "",
      suggestions: [],
      loader: false,
      error: false,
    };
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error !== state.errorMessage) {
      return {
        errorMessage: props.error,
        showErrorModal: true,
      };
    }
    return null;
  }
  logout = () => {
    this.setState(
      {
        showMenu: false,
        showRegisterModal: false,
        showLoginModal: false,
        showForgotPasswordModal: false,
      },
      () => {
        this.props.logout();
        this.props.history.push("/");
      }
    );
  };
  loginModalHandler = (param) => {
    this.setState({ showLoginModal: !this.state.showLoginModal });
    if (param === "showForgotPassword") {
      this.setState({
        showForgotPasswordModal: true,
      });
    }
  };
  registerModalHandler = () => {
    console.log("REGISTER MODAL###");
    this.setState({ showRegisterModal: !this.state.showRegisterModal }, () => {
      console.log("REGISTER MODAL###", this.state.showRegisterModal);
    });
  };

  renderSuggestion = (suggestion) => {
    const { loader } = this.state;
    if (loader) {
      return <LoadingSpinner />;
    }
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            backgroundColor: "transparent",
          }}
        >
          <img
            src={baseURL + suggestion.movieImg}
            alt="movieImg"
            style={{ width: "3rem", height: "4rem" }}
          />{" "}
          <p
            style={{
              fontSize: "1rem",
              margin: "1.5rem 0",
              marginLeft: "1rem",
              backgroundColor: "transparent",
            }}
          >
            {" " + suggestion.movieTitle}{" "}
          </p>
        </div>
      </Fragment>
    );
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
  };

  getSuggestionValue = (suggestion) => {
    console.log("reviews###", suggestion);
    sessionStorage.setItem("Reviews.ID", suggestion._id);
    return suggestion.movieTitle;
  };

  onSuggestionSelected = (suggestion) => {
    let id = sessionStorage.getItem("Reviews.ID");
    this.props.history.push(`/home/movie/${id}`);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      value: "",
    });
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState(
      {
        loader: true,
      },
      async () => {
        try {
          const res = await axios.post(`api/v1/reviews/${value}`);
          this.setState({
            suggestions: res.data.data,
            loader: false,
          });
        } catch (e) {
          this.setState({
            error: true,
            loader: false,
          });
        }
      }
    );
  };

  debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  onSuggestionsFetchRequestedDebounce = this.debounce(
    this.onSuggestionsFetchRequested,
    500
  );

  closeModal = () => {
    this.setState({
      error: false,
    });
  };
  render() {
    const {
      reviews,
      showRegisterModal,
      showLoginModal,
      showForgotPasswordModal,
      value,
      suggestions,
      error,
    } = this.state;
    let showMenu = sessionStorage.getItem("Reviews.ShowMenu");
    // console.log(showMenu);
    // console.log("showLoginModal###", this.state.showLoginModal);
    if (error) {
      return (
        <ErrorModal
          message={"Some thing went wrong"}
          showModal={error}
          closeModal={this.closeModal}
        />
      );
    }
    const inputProps = {
      placeholder: "Search",
      value,
      onChange: this.onChange,
    };
    const theme = {
      container: {
        marginBottom: "1rem",
        marginRight: "40rem",
        position: "relative",
      },
      input: {
        backgroundColor: "#fff",
        color: "#000",
        width: "450%",
        height: "2rem",
        border: "none",
        borderRadius: ".2rem",
        padding: ".5rem",
      },
      inputFocused: {
        // border: "1px solid #87cefa",
      },
      suggestionsContainer: {
        // border: "1px solid #fff",
        width: "450%",
        // position: "fixed",
      },
      suggestionsList: {
        listStyle: "none",
        // color: "#000",
      },
      suggestion: {
        padding: ".5rem",
        backgroundColor: "#000",
        color: "#fff",
      },
      suggestionHighlighted: {
        cursor: "pointer",
        backgroundColor: "#4c4c4c",
        // width: "11.6%",
      },
    };
    return (
      <Fragment>
        <div className="auth">
          <img
            src={imdbImg}
            alt="imdbLogo"
            className="imdbLogo"
            onClick={() => this.props.history.push("/")}
          />
          <span>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={
                this.onSuggestionsFetchRequestedDebounce
              }
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              onSuggestionSelected={this.onSuggestionSelected}
              inputProps={inputProps}
              theme={theme}
            />
          </span>
          {localStorage.getItem("Reviews.token") ? (
            <Fragment>
              <UserDetails logout={this.logout} />
            </Fragment>
          ) : (
            <Fragment>
              <span style={{ padding: ".2rem" }}>
                <span className="register" onClick={this.registerModalHandler}>
                  Register{" "}
                </span>
                <span className="login" onClick={this.loginModalHandler}>
                  Login
                </span>
              </span>
            </Fragment>
          )}
        </div>
        <div className="container">
          <span>
            {showRegisterModal ? (
              <Register
                showRegisterModal={showRegisterModal}
                registerModalHandler={this.registerModalHandler}
              />
            ) : null}
            {showLoginModal ? (
              <Fragment>
                <Login
                  showLoginModal={showLoginModal}
                  loginModalHandler={this.loginModalHandler}
                />
              </Fragment>
            ) : null}
            {showForgotPasswordModal ? (
              <ForgotPassword
                showForgotPasswordModal={showForgotPasswordModal}
                forgotPasswordModalHandler={this.forgotPasswordModalHandler}
              />
            ) : null}
          </span>
        </div>
      </Fragment>
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
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
