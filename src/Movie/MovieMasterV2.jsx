/*class MovieMaster extends Component {
  errorMsg = null;

  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      casts: [],
      loading: false,
      showRating: false,
      showMovieMasterModal: false,
      ratingMsg: "",
      ratingLoader: false,
      showWatchList: true,
      reviewId: null,
    };
  }
  setWatchList = (param) => {
    this.setState({
      showWatchList: param,
    });
  };
  setRating = (param) => {
    this.setState({
      showRating: param,
    });
  };
  closeMovieMasterModal = () => {
    this.setState({
      showMovieMasterModal: false,
    });
  };
  ratingHandler = async (rating) => {
    const obj = {
      rating,
    };
    this.setState(
      {
        ratingLoader: true,
      },
      async () => {
        try {
          await axios.post(
            `/api/v1/movies/${this.state.movie._id}/rating`,
            obj
          );
          const movie = await this.getMoview(this.state.reviewId);
          this.setState({
            showMovieMasterModal: true,
            ratingMsg: "You have successfully rated this movie",
            movie,
            ratingLoader: false,
            showRating: false,
          });
        } catch (e) {
          this.setState(
            {
              showMovieMasterModal: true,
              ratingMsg: e.response.data.error.startsWith("E11000")
                ? "You have already rated this movie"
                : e.response.data.error,
              ratingLoader: false,
              showRating: false,
            },
            () =>
              console.log(this.state.ratingMsg, this.state.showMovieMasterModal)
          );
        }
      }
    );
  };

  getMoview = async (id) => {
    console.log("id##", id);
    try {
      const movie = await axios.get(`api/v1/reviews/${id}/movies`);
      return movie.data.data;
    } catch (e) {
      this.errorMsg = e.message;
    }
  };
  displayCasts = (param) => {
    console.log(param);
    try {
      const movie = this.state.movie;
      console.log("movie #", movie);
      this.setState({
        casts: movie.members.casts.slice(0, param),
      });
    } catch (e) {
      this.errorMsg = e.message;
    }
  };
 

  fetchInitMovie = (reviewId) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const movie = await this.getMoview(reviewId);
        this.setState(
          {
            movie,
            reviewId,
            loading: false,
          },
          () => this.displayCasts(3)
        );
      }
    );
  };

  getReviewId = () => {
    const param = new URLSearchParams(this.props.location.search);
    const reviewId = param.toString().split("=")[1];
    return reviewId;
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const reviewId = this.getReviewId();
      this.fetchInitMovie(reviewId);
    }
  }

  componentDidMount() {
    const reviewId = this.getReviewId();
    this.fetchInitMovie(reviewId);
  }
  render() {
    const {
      movie,
      loading,
      casts,
      showRating,
      showMovieMasterModal,
      ratingMsg,
      ratingLoader,
      showWatchList,
    } = this.state;

    if (this.errorMsg !== null) {
      return <Redirect to="/" />;
    }

    if (loading) {
      return (
        <span className="loading">
          <LoadingSpinner />
        </span>
      );
    }
    console.log("casts ##", casts);
    console.log("movie ##", movie.title);
    if (casts.length === 0) return null;

    return (
      <div className="container">
        {movie === {} ? (
          <p>No Data Found</p>
        ) : (
          <div className="item">
            <span className="movie-title">
              <div>
                <p style={{ color: "fff" }}>
                  {movie.title} ({year(movie.dateOfRelease)})
                </p>
                <span className="movie-desc">
                  <p className="movie-desc-p1">{movie.parentalGuidelines[0]}</p>
                  {" | "}
                  <p className="movie-desc-p2">{movie.runtime} </p>
                  {" | "}
                  <span className="genre">
                    {movie.genre.length !== 0
                      ? movie.genre.map((item, index, arr) => (
                          <p key={index} className="movie-items">
                            {index !== arr.length - 1 ? `${item + ","}` : item}
                          </p>
                        ))
                      : null}
                  </span>
                  {" | "}
                  <p className="movie-desc-p2">
                    {convertDate(movie.dateOfRelease)}
                  </p>
                </span>
              </div>

              <span className="icon-container movie-master-icon-container">
                <span>
                  <FontAwesomeIcon icon={faStar} className="icon" size="xs" />
                </span>
                <p className="average-rating">
                  {movie.averageRating + "/" + 10}
                  <p className="users-rated">({movie.usersRated} USERS )</p>
                </p>
                <span className="icon-container empty-icon-conatiner">
                  {ratingLoader ? (
                    <LoadingSpinner className="loading" />
                  ) : (
                    <Fragment>
                      {showRating ? (
                        <MovieRating
                          getRating={this.ratingHandler}
                          showRating={this.setRating}
                        />
                      ) : null}
                      <span
                        style={{ display: "flex" }}
                        onClick={() => this.setRating(!this.state.showRating)}
                      >
                        <span>
                          <FontAwesomeIcon
                            icon={faStar}
                            // className="empty-icon"
                            size="xs"
                          />
                        </span>
                        <p
                          style={{
                            fontSize: ".7rem",
                            marginTop: ".7rem",
                            marginLeft: ".2rem",
                          }}
                        >
                          Rate <br /> This
                        </p>
                      </span>
                    </Fragment>
                  )}
                </span>
              </span>
            </span>
            <div>
              {showMovieMasterModal ? (
                <MovieMasterModal
                  message={ratingMsg}
                  closeModal={this.closeMovieMasterModal}
                  showModal={showMovieMasterModal}
                />
              ) : null}
            </div>
            <MovieTrailer reviewId={this.state.reviewId} />
            <span>
              <p className="story">Story: {movie.story}</p>
            </span>
            <span>
              <p>Creator: {movie.members.creator}</p>
              {movie.members.casts.length !== 0 ? (
                <span className="casts">
                  <span>Casts</span>:{" "}
                  {casts.map((name, index, arr) => (
                    <p key={index}>
                      {index < arr.length - 1 ? `${name + ","}` : name}
                    </p>
                  ))}
                  <span
                    onClick={() =>
                      this.displayCasts(
                        casts.length !== movie.members.casts.length
                          ? movie.members.casts.length
                          : 3
                      )
                    }
                    className="more"
                  >
                    {casts.length !== movie.members.casts.length
                      ? "Show More"
                      : "Show Less"}
                  </span>
                </span>
              ) : null}
            </span>
            <div>
              {!this.props.authLoading ? (
                <WatchList
                  movieId={movie._id}
                />
              ) : (
                <LoadingSpinner />
              )}
            </div>
            <div className="movie-picture">
              <MoviePicture photos={movie.photos} />
            </div>
          </div>
        )}
      </div>
    );
  }
}*/
