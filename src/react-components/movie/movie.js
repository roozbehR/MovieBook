import React from "react";
import { Card, Row, Col, Rate, Divider, Button, Collapse, Input } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import "./style.css";

import { getRandomMovie } from "../../models/movie";
import { getRandomReview } from "../../models/review";

import Review from "../review/review";

class Movie extends React.Component {
  state = {
    movie: getRandomMovie(),
    reviews: [
      getRandomReview(),
      getRandomReview(),
      getRandomReview(),
      getRandomReview(),
    ],
    reviewButton: {
      enabled: null,
      text: null,
      icon: null,
    },
    reviewText: null,
    reviewRating: 0,
  };

  componentDidMount() {
    this.setAddReview(true);
  }

  setAddReview = (value) => {
    if (value) {
      this.setState({
        reviewButton: {
          enabled: true,
          text: "Add a Review",
          icon: <PlusCircleOutlined />,
        },
        reviewText: null,
      });
    } else {
      this.setState({
        reviewButton: {
          enabled: false,
          text: "Cancel Review",
          icon: <MinusCircleOutlined />,
        },
      });
    }
  };

  toggleAddReview = () => {
    this.setAddReview(!this.state.reviewButton.enabled);
  };

  handleReviewText = (e) => {
    this.setState({
      reviewText: e.target.value,
    });
  };

  handleReviewRating = (val) => {
    this.setState({
      reviewRating: val,
    });
  };

  postReview = () => {
    let reviews = this.state.reviews;
    let newReview = getRandomReview();

    // Add new review
    newReview.rating = this.state.reviewRating;
    newReview.text = this.state.reviewText;
    newReview.comments = [];
    reviews = [newReview].concat(reviews);

    this.setState({
      reviews: reviews,
    });

    this.toggleAddReview();
  };

  render() {
    const { Panel } = Collapse;
    const { TextArea } = Input;
    const userAuthenticated = localStorage["user"] != null;

    return (
      <Card title="Movie">
        <Row>
          <Col xs={10} sm={10} md={8} lg={8} xl={4}>
            <div className="post-image">
              <img src={this.state.movie.image}></img>
            </div>
          </Col>
          <Col xs={14} sm={14} md={16} lg={16} xl={20}>
            <div className="movie-des">
              <h3 className="movie-name">{this.state.movie.title}</h3>
              <p className="release-date">
                {this.state.movie.year}
                <span className="movie-rate">
                  <Rate
                    disabled="true"
                    value={this.state.movie.rating}
                    allowHalf="true"
                  />
                </span>
              </p>
              <p className="description">{this.state.movie.description}</p>
            </div>
          </Col>
        </Row>

        <Divider>Reviews</Divider>
        {userAuthenticated &&
          <div>
            <Row>
              <Col span={24}>
                <Button className="btn-review" onClick={this.toggleAddReview}>
                  {this.state.reviewButton.icon}
                  {this.state.reviewButton.text}
                </Button>
                {!this.state.reviewButton.enabled && (
                  <Button className="btn-review" onClick={this.postReview}>
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
              Post Review
                  </Button>
                )}
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Collapse activeKey={!this.state.reviewButton.enabled} ghost>
                  <Panel key="true" showArrow="false" style={{ width: "100%" }}>
                    <Rate
                      className="review-rate"
                      allowHalf="true"
                      value={this.state.reviewRating}
                      onChange={this.handleReviewRating}
                    />
                    <TextArea
                      className="review-text"
                      onChange={this.handleReviewText}
                      maxLength="250"
                      value={this.state.reviewText}
                    ></TextArea>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </div>
        }
        <Row>
          <Col span={24}>
            {this.state.reviews.map((review) => (
              <Review
                showComments="true"
                addCommentEnabled="true"
                review={review}
              />
            ))}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Movie;
