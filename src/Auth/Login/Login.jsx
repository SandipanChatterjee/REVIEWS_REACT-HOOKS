/* eslint-disable react-hooks/exhaustive-deps */
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import * as Yup from "yup";
import { auth, logout } from "../../store/actions/auth";
import { LoadingSpinner } from "../../utils";
import ErrorModal from "../Error";
import "../Register/Register.css";
import "./Login.css";
const initialValues = {
  email: "",
  password: "",
};
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: Yup.string()
    .min(6, "Password must be 6 characters or more")
    .required("Please enter password"),
});

const Login = (props) => {
  const [showErrorModal, setShowErrorModal] = useState(() => false);
  const [errorMessage, setErrorMessage] = useState(() => "");
  const [showForgorPasswordModal, setShowForgotPasswordModal] = useState(
    () => false
  );
  let firstTime = useRef(true);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      return;
    }
    props.onLogout();
  }, [showErrorModal]);

  const closeModal = () => {
    setShowErrorModal(false);
  };

  const handleSubmit = (values) => {
    const { showRating } = props;
    if (showRating) {
      showRating(false);
    }
    console.log("values####", values);
    props.onLogin(values, "login");
  };

  if (props.error !== errorMessage) {
    setErrorMessage(props.error);
    setShowErrorModal(true);
  }

  const customStyles = {
    content: {
      top: "10%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      width: "50%",
      height: "20rem",
      borderRadius: "1rem",
      transition: "all .6s ease-in-out 0s",
    },
  };

  const { showLoginModal, loginModalHandler, loading, token } = props;

  if (errorMessage !== null && errorMessage !== undefined) {
    console.log("errorMsg###", errorMessage);
    return (
      <ErrorModal
        message={errorMessage}
        showModal={showErrorModal}
        closeModal={closeModal}
      />
    );
  }
  if (initialValues === {}) {
    return null;
  }
  if (loading) {
    return <LoadingSpinner />;
  }

  if (token) {
    props.loginModalHandler();
  }

  return (
    <div data-test="Login">
      <Modal
        isOpen={showLoginModal}
        onRequestClose={loginModalHandler}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <Formik
          initialValues={initialValues}
          style={customStyles}
          validationSchema={schema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, handleChange, setFieldValue, errors, touched }) => (
            <Form>
              <div className="auth-heading">
                <span>Login</span>
              </div>

              <div className="field-container">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="field"
                />
                {touched.email && errors.email ? (
                  <span className="error">{errors.email}</span>
                ) : null}
              </div>
              <div className="field-container">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="field"
                />
                {touched.password && errors.password ? (
                  <span className="error">{errors.password}</span>
                ) : null}
              </div>
              <div className="login-field-container">
                <div className="field-container submit-container">
                  <button
                    type="button"
                    className="submit"
                    onClick={loginModalHandler}
                  >
                    Cancel
                  </button>{" "}
                  <button type="submit" className="submit">
                    Submit
                  </button>
                </div>
                {
                  // <span
                  //   onClick={() => loginModalHandler("showForgotPassword")}
                  // >
                  //   Forgot Password
                  // </span>
                }
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

Login.defaultProps = {
  showLoginModal: false,
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
    onLogout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
