import React, { Component } from "react";
import { Field, Form, Formik } from "formik";
import Modal from "react-modal";
import axios from "../../eaxios";
import "../Register/Register.css";
import "../Login/Login.css";
import { LoadingSpinner } from "../../utils";
import ErrorModal from "../Error";
import * as Yup from "yup";
const initialValues = {
  password: "",
  cpassword: "",
};

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 characters or less")
    .required("Please enter password"),
  cpassword: Yup.string()
    .min(6, "Confirm password must be 6 characters or less")
    .required("Please enter Confirm password"),
});
const validateConfirmPassword = (values) => {
  let error;
  if (values.password !== values.cpassword) {
    error = "Password and Confirm password do not match";
  }
  return error;
};
class ResetPassword extends Component {
  state = {
    showModal: true,
    loading: false,
    successMsg: "",
    successModal: false,
    errorMsg: "",
    showErrorModal: false,
  };
  closeModalHandler = () => {
    console.log("closeModalHandler1");
    this.setState(
      {
        showModal: false,
      },
      () => {
        console.log("closeModalHandler2");

        this.props.history.push("/");
      }
    );
  };
  //error modal
  closeModal = () => {
    this.setState({ showErrorModal: false });
  };
  handleSubmit = (values) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        try {
          const param = {
            password: values.password,
          };
          let token = this.props.match.params.resettoken;
          const result = await axios.put(
            `api/v1/auth/resetpassword/${token}`,
            param
          );
          localStorage.setItem("Reviews.token", result.data.token);
          this.setState({
            loading: false,
            successMsg: "Reset password successfull",
            successModal: true,
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
  componentDidMount() {
    console.log("Reset password called..");
  }
  render() {
    const {
      showModal,
      loading,
      showErrorModal,
      errorMsg,
      successModal,
      successMsg,
    } = this.state;
    const customStyles = {
      content: {
        top: "10%",
        left: "25%",
        right: "auto",
        bottom: "auto",
        width: "50%",
        height: "18rem",
        borderRadius: "1rem",
      },
    };
    if (loading) {
      return <LoadingSpinner />;
    }
    if (showErrorModal) {
      return (
        <ErrorModal
          message={errorMsg}
          showModal={showErrorModal}
          closeModal={this.closeModal}
        />
      );
    }
    return (
      <div>
        <Modal
          isOpen={showModal}
          onRequestClose={this.closeModalHandler}
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
                <div className="field-container">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="field"
                  />
                  {touched.password && errors.password ? (
                    <span className="error">{errors.password}</span>
                  ) : null}
                </div>
                <div className="field-container">
                  <Field
                    name="cpassword"
                    type="password"
                    validate={() => validateConfirmPassword(values)}
                    placeholder="Confirm password"
                    className="field"
                  />
                  {touched.cpassword && errors.cpassword ? (
                    <span className="error">{errors.cpassword}</span>
                  ) : null}
                </div>
                <div className="login-field-container">
                  <div className="field-container submit-container">
                    <button className="submit" onClick={this.closeModalHandler}>
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
              <button onClick={this.closeModalHandler} className="submit">
                OK
              </button>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default ResetPassword;
