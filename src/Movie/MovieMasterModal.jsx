import React, { Component } from "react";
import Modal from "react-modal";
class MovieMasterModal extends Component {
  render() {
    const { closeModal, showModal } = this.props;
    const customStyles = {
      content: {
        top: "10%",
        left: "25%",
        right: "auto",
        bottom: "auto",
        width: "50%",
        height: "10rem",
        borderRadius: "1rem",
      },
    };
    return (
      <div>
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <span
              style={{
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "1.5rem",
              }}
            >
              {this.props.message}
            </span>
          </div>
          <div className="field-container submit-container">
            <button onClick={closeModal} className="submit">
              OK
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default MovieMasterModal;
