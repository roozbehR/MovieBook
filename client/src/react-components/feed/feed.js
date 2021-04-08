import React from "react";
import { Card, Row, Col, Rate, Divider, Button, Collapse, Input } from "antd";
import "./style.css";
import { getFeed } from '../../actions/feed'
import Review from "../review/review";
import LoadingSpin from '../loading-spin/loading-spin';

class Feed extends React.Component {
  state = {
    reviews: [],
    fetchedFeed: false,
  };

  componentDidMount() {
    getFeed(this).then(() => {
      this.setState({fetchedFeed: true})
    });
  }

  render() {
    return (
      <Card title="Feed">
        {!this.state.fetchedFeed && <LoadingSpin/>}
        {this.state.fetchedFeed &&
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
            {this.state.reviews.length == 0 &&
              <center><i>No reviews found in your feed, start following users to view their reviews!</i></center>
            }
          </Col>
        </Row>
        }
      </Card>
    );
  }
}

export default Feed;
