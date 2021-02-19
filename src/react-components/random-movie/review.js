import React from "react";
import { Comment } from "antd";

import './style.css';

class Review extends React.Component {
    state = {
    }
    render() {
        const {
            id,
            user,
            movie,
            rating,
            text
        } = this.props.review;
        return (
            <div>
                <Comment
                    author={user.username}
                    content={text}
                    avatar={user.picture}>
                </Comment>
            </div>
        );
    }
}

export default Review;