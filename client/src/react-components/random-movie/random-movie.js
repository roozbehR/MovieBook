import React from "react";
import { Row, Col, Card } from "antd";
import { getRandomReview, getReview } from "../../models/review";
//import { getRandomMovie, getMovie } from "../../models/movie";
import Movie from "./movie";
import Review from "../review/review";
import "./style.css";
import { getRandomMovie } from '../../actions/movies';

class RandomMovie extends React.Component {
  state = {
    randomReviews: "",
    randomMovie: "",
  };

  componentDidMount(){
    getRandomMovie(this)
  }

  render() {
    return (
      <Card title="Random Movie" className="random-movie-card">
        <Movie
          className="random-movie-movie"
          movie_title={this.state.randomMovie.title}
          movie_year={this.state.randomMovie.year}
          movie_image={this.state.randomMovie.poster}
          movie_dec={this.state.randomMovie.fullplot}
          movie={this.state.randomMovie}
          description={this.sliceDescription}
        />
      </Card>
    );
  }
}

export default RandomMovie;
