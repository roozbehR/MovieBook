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

class Feed extends React.Component {
  state = {
    reviews: [
      getRandomReview(),
      getRandomReview(),
      getRandomReview(),
      getRandomReview(),
    ],
  };

  render() {
    return (
      <Card title="Feed">
        <Row>
          <Col span={24}>
            {this.state.reviews.map((review) => (
              <div>
                <Review
                  showComments="true"
                  addCommentEnabled="true"
                  review={review}
                  showMovie="true"
                />
              </div>
            ))}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Feed;
