import React from "react";
import { Row, Col, Card, Rate } from "antd";
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

  componentWillMount(){
    getRandomMovie(this)

  }

  render() {
    return (
      <Card title="Random Movie" className="random-movie-card">
        <Row>
        <Col xs={10} sm={10} md={8} lg={8} xl={4}>
          <div className="post-image">
            <img src={this.state.randomMovie.poster} alt="No Image Available"></img>
          </div>
        </Col>
        <Col xs={14} sm={14} md={16} lg={16} xl={20}>
          <div className="movie-des">
            <h3 className="movie-name">
              <a href="movie">{this.state.randomMovie.title}</a>
            </h3>
            <p className="release-date">
              {this.state.randomMovie.year}{" "}
            </p>
            <p className="description">{this.state.randomMovie.plot}</p>
          </div>
        </Col>
      </Row>
      </Card>
    );
  }
}

export default RandomMovie;
