import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
class UserDetails extends Component {
  state = {
    items: [
      {
        path: "watchlist",
        name: "YOUR WATCHLIST",
      },
      {
        path: "rating",
        name: "YOUR RATINGS",
      },
      {
        path: "/",
        name: "SIGN OUT",
      },
    ],
    showMenu: false,
  };

  routeHandler = (path, name) => {
    if (name === "SIGN OUT") {
      this.props.logout();
    } else {
      this.props.history.push(`/home/${path}`);
    }
  };
  menuHandler = () => {
    this.setState(
      {
        showMenu: !this.state.showMenu,
      },
      () => {
        sessionStorage.setItem("Reviews.ShowMenu", this.state.showMenu);
      }
    );
  };

  render() {
    const { items, showMenu } = this.state;
    const email = localStorage.getItem("Reviews.email");
    /*const backgroundColor1 = {
      backgroundColor: "#000",
    };
    const backgroundColor2 = {
      backgroundColor: "#4c4c4c",
    };*/

    return (
      <div
        style={
          !showMenu
            ? {
                padding: ".2rem",
                cursor: "pointer",
                zIndex: 2,
              }
            : {
                padding: ".2rem",
                cursor: "pointer",
                zIndex: 2,
              }
        }
        onClick={this.menuHandler}
      >
        <span>{email} </span>
        <span>
          <FontAwesomeIcon
            icon={showMenu ? faCaretUp : faCaretDown}
            className="icon"
            size="1x"
            onClick={this.menuHandler}
          />
        </span>
        <div>
          {showMenu
            ? items.map((el, index) => {
                return (
                  <div
                    onClick={() => this.routeHandler(el.path, el.name)}
                    className="dropdown"
                  >
                    <div className="dropdown-content">{el.name}</div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default withRouter(UserDetails);
