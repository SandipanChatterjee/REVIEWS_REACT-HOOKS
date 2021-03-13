import React, { Component } from "react";

class Error extends Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          left: "42%",
          top: "45%",
        }}
      >
        <p>{this.props.error}</p>
      </div>
    );
  }
}

Error.defaultProps = {
  error: "Something went wrong",
};

export default Error;
