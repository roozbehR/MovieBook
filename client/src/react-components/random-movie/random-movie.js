import React from "react";
import MovieOverview from '../movie-overview/movie-overview';

import "./style.css";
import { getRandomMovie } from '../../actions/movies';

class RandomMovie extends React.Component {
  state = {
    randomReviews: "",
    randomMovie: "",
  };

  componentWillMount() {
    getRandomMovie(this)
  };

  render() {
    let passedProps = {
      sectionTitle: null,
      imgURL: this.state.randomMovie.poster,
      movieId: this.state.randomMovie._id,
      movieTitle: this.state.randomMovie.title,
      screeningYear: this.state.randomMovie.year,
      plot: this.state.randomMovie.plot,
    };

    return (
      <div>
        {this.state.randomMovie !== "" && <MovieOverview {...passedProps}/>}
      </div>
    );
  }
}

export default RandomMovie;
