import React from "react";
import { Row, Col, Rate } from "antd";
import "./style.css";

class Movie extends React.Component {
  state = {
    id: this.props.movie.id,
    title: this.props.movie.title,
    year: this.props.movie.year,
    rating: this.props.movie.rating,
    image: this.props.movie.image,
    description: this.props.movie.description,
  };
  componentWillMount() {
    this.sliceDescription(this.state.description);
  }
  sliceDescription(description) {
    let desc = description;
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
  render() {
    const {} = this.props.movie;
    return (
      <Row>
        <Col xs={10} sm={10} md={8} lg={8} xl={4}>
          <div className="post-image">
            <img src={this.state.image}></img>
          </div>
        </Col>
        <Col xs={14} sm={14} md={16} lg={16} xl={20}>
          <div className="movie-des">
            <h3 className="movie-name">
              <a href="movie">{this.state.title}</a>
            </h3>
            <p className="release-date">
              {this.state.year}{" "}
              <span className="movie-rate">
                <Rate
                  disabled="true"
                  value={this.state.rating}
                  allowHalf="true"
                />
              </span>
            </p>
            <p className="description">{this.state.description}</p>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Movie;
