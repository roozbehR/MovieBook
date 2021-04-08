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
        <div>
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
              </Col>
            </Row>
            }
          </Card>
        </div>
    );
  }
}

export default Feed;
