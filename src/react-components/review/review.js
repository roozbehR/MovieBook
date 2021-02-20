import React from "react";
import { Comment } from "antd";
import { Rate } from 'antd';

import './style.css';

import { getRandomComment } from '../../models/comment'

class Review extends React.Component {
    state = {
        comments: [
            getRandomComment(),
            getRandomComment(),
            getRandomComment(),
        ],
    }
    render() {
        const {
            user,
            text,
            rating
        } = this.props.review;

        const movieTitle = <div>
            <span className="username">{user.username}</span>
            <Rate className="review-rating" disabled="true" value={rating} allowHalf="true" />
                            </div>
        return (
            <div>
                <Comment className="parent-comment"
                    author={movieTitle}
                    content={text}
                    avatar={user.picture}>
                        { this.state.comments.map((comment) =>
                            <Comment
                                author={comment.user.username}
                                content={comment.review.text}
                                avatar={comment.user.picture}>
                            </Comment>
                        )}
                </Comment>
            </div>
        );
    }
}

export default Review;