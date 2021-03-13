import React, { Component } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Button } from "../../StyledComponent";
import "./MoviePicture.css";

class MoviePicture extends Component {
  myArrow = ({ type, onClick, isEdge }) => {
    // console.log("PrevArrow####", type);
    const pointer = type === consts.PREV ? "<" : ">";
    return (
      <Button
        onClick={onClick}
        disabled={isEdge}
        style={{ marginTop: "4rem", cursor: "pointer" }}
      >
        {pointer}
      </Button>
    );
  };
  pagination = ({ pages, activePage, onClick }) => {
    return <></>;
  };

  render() {
    const { photos } = this.props;

    if (!photos) {
      return null;
    }

    return (
      <div className="photos-container" data-test="photos-container">
        <Carousel
          itemsToScroll={4}
          itemsToShow={4}
          renderArrow={this.myArrow}
          renderPagination={this.pagination}
        >
          {photos.length > 0
            ? photos.map((el, index) => {
                return (
                  <img
                    src={process.env.REACT_APP_API_URL + el}
                    alt="pic"
                    className="photos"
                  />
                );
              })
            : null}
        </Carousel>
      </div>
    );
  }
}

// MoviePicture.defaultProps = {
//   photos: [],
// };

export default MoviePicture;
