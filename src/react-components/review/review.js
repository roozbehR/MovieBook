import React from "react";
import { Row, Col, Comment, Rate, Button, Collapse, Input } from "antd";
import {
  CommentOutlined,
  MinusCircleOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";

import "./style.css";

import { getRandomComment } from "../../models/comment";

class Review extends React.Component {
  state = {
    showComments: this.props.showComments ?? false,
    comments: [getRandomComment(), getRandomComment(), getRandomComment()],
    commentButton: {
      enabled: null,
      text: null,
      icon: null,
    },
    commentText: null,
  };

  componentDidMount() {
    this.setAddComment(true);
  }

  setAddComment = (value) => {
    if (value) {
      this.setState({
        commentButton: {
          enabled: true,
          text: "Add a Comment",
          icon: <CommentOutlined />,
        },
        reviewText: null,
      });
    } else {
      this.setState({
        commentButton: {
          enabled: false,
          text: "Cancel Comment",
          icon: <MinusCircleOutlined />,
        },
      });
    }
  };

  toggleAddComment = () => {
    this.setAddComment(!this.state.commentButton.enabled);
  };

  postComment = () => {
    let comments = this.state.comments;
    let newComment = getRandomComment();

    // Add new comment
    newComment.text = this.state.commentText;
    console.log(newComment);
    comments.push(newComment);
    console.log(comments);
    this.setState({
      comments: comments,
    });

    this.toggleAddComment();
  };

  handleCommentText = (e) => {
    this.setState({
      commentText: e.target.value,
    });
  };

  render() {
    const { Panel } = Collapse;
    const { TextArea } = Input;
    const { user, text, rating } = this.props.review;

    const movieTitle = (
      <div>
        <a href="profile" className="username">{user.username}</a>
        <Rate
          className="review-rating"
          disabled="true"
          value={rating}
          allowHalf="true"
        />
      </div>
    );
    return (
      <div>
        <Comment
          className="parent-comment"
          author={movieTitle}
          content={text}
          avatar={user.picture}
        >
          {this.state.showComments &&
            this.state.comments.map((comment) => (
              <Comment
                author={<a className="username" href="profile">{comment.user.username}</a>}
                content={comment.text}
                avatar={comment.user.picture}
              ></Comment>
            ))}
          {this.state.showComments && this.props.addCommentEnabled && (
            <div>
              <Row>
                <Col span={24}>
                  <Button
                    className="btn-comment btn-comment-right"
                    type="text"
                    onClick={this.toggleAddComment}
                  >
                    {this.state.commentButton.icon}
                    {this.state.commentButton.text}
                  </Button>
                  {!this.state.commentButton.enabled && (
                    <Button
                      className="btn-comment"
                      type="text"
                      onClick={this.postComment}
                    >
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                      Post Comment
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Collapse activeKey={!this.state.commentButton.enabled} ghost>
                    <Panel
                      key="true"
                      showArrow="false"
                      style={{ width: "100%" }}
                    >
                      <TextArea
                        className="comment-text"
                        onChange={this.handleCommentText}
                        maxLength="250"
                        value={this.state.commentText}
                      ></TextArea>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            </div>
          )}
        </Comment>
      </div>
    );
  }
}

export default Review;
