import React from "react";
import { Row, Col, Rate } from "antd";
import "./style.css";

class Movie extends React.Component {
  state = {
    id: this.props.movie._id,
    title: this.props.movie_title,
    year: this.props.movie_year,
    //rating: this.props.movie.imdb.rating,
    image: this.props.movie_image,
    description: this.props.movie_dec,
  };
  componentWillMount() {
    console.log(this.state.description)
    this.sliceDescription(this.state.description);
  }

  sliceDescription(description) {
    let desc = description;
    if (desc != null){
      if (desc.length > 300) {
        desc = desc.substring(0, 300) + "...";
        this.setState({ description: desc });
        return;
      } else {
        desc = desc + "...";
        this.setState({ description: desc });
        return;
      }
    }
  }

  render() {
    //const {} = this.props.movie;
    return (
      <Row>
        <Col xs={10} sm={10} md={8} lg={8} xl={4}>
          <div className="post-image">
            <img src={this.state.image} alt="No Image Available"></img>
          </div>
        </Col>
        <Col xs={14} sm={14} md={16} lg={16} xl={20}>
          <div className="movie-des">
            <h3 className="movie-name">
              <a href="movie">{this.state.title}</a>
            </h3>
            <p className="release-date">
              {this.state.year}{" "}
            </p>
            <p className="description">{this.state.description}</p>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Movie;
