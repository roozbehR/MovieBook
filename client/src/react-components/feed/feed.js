import React from "react";
import { Card, Row, Col, Rate, Divider, Button, Collapse, Input } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import "./style.css";
import { getFeed } from '../../actions/feed'
import Review from "../review/review";

class Feed extends React.Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    getFeed(this);
  }

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
