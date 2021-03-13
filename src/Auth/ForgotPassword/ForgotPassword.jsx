import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
import Modal from "react-modal";
// import axios from "../../eaxios";
import axios from "axios";
import ErrorModal from "../Error";
import "../Register/Register.css";
import "../Login/Login.css";
import { LoadingSpinner } from "../../utils";
import * as Yup from "yup";
const initialValues = {
  email: "",
};
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter email"),
});
export class ForgotPassword extends Component {
  state = {
    successMsg: "",
    successModal: false,
    errorMsg: "",
    showErrorModal: false,
    loading: false,
  };
  closeSuccessModal = () => {
    this.setState({
      successModal: false,
      successMsg: "",
    });
  };
  //error modal
  closeModal = () => {
    this.setState({ showErrorModal: false });
  };
  handleSubmit = (values) => {
    const param = {
      email: values.email,
    };
    this.setState(
      {
        loading: true,
      },
      async () => {
        try {
          const result = await axios.post(
            `http://localhost:5000/api/v1/auth/forgotpassword`,
            param
          );
          this.setState({
            successModal: true,
            successMsg: result.data.message,
            loading: false,
          });
        } catch (e) {
          this.setState({
            errorMsg: e.response.data.error,
            showErrorModal: true,
            loading: false,
          });
        }
      }
    );
  };

  render() {
    const { showForgotPasswordModal, forgotPasswordModalHandler } = this.props;
    const {
      successModal,
      successMsg,
      showErrorModal,
      errorMsg,
      loading,
    } = this.state;
    if (showErrorModal) {
      return (
        <ErrorModal
          message={errorMsg}
          showModal={showErrorModal}
          closeModal={this.closeModal}
        />
      );
    }
    if (loading) {
      return <LoadingSpinner />;
    }
    const customStyles = {
      content: {
        top: "10%",
        left: "25%",
        right: "auto",
        bottom: "auto",
        width: "50%",
        height: "15rem",
        borderRadius: "1rem",
      },
    };
    return (
      <div>
        <Modal
          isOpen={showForgotPasswordModal}
          onRequestClose={forgotPasswordModalHandler}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <Formik
            initialValues={initialValues}
            style={customStyles}
            validationSchema={schema}
            onSubmit={this.handleSubmit}
            enableReinitialize={true}
          >
            {({ values, handleChange, setFieldValue, errors, touched }) => (
              <Form>
                <div className="auth-heading">
                  <span>Forgot Password</span>
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
                <div className="login-field-container">
                  <div className="field-container submit-container">
                    <button
                      className="submit"
                      onClick={forgotPasswordModalHandler}
                    >
                      Cancel
                    </button>{" "}
                    <button type="submit" className="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
        {successModal ? (
          <Modal
            isOpen={successModal}
            onRequestClose={this.closeSuccessModal}
            // style={{ ...customStyles["content"], height: "8rem" }}
            style={customStyles}
            contentLabel="Success Modal"
            ariaHideApp={false}
          >
            {" "}
            <h3
              style={{
                color: "#000",
                backgroundColor: "#fff",
                textAlign: "center",
                margin: "auto",
              }}
            >
              {successMsg}
            </h3>
            <div className="field-container submit-container">
              <button onClick={forgotPasswordModalHandler} className="submit">
                OK
              </button>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default ForgotPassword;
