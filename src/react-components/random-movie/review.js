import React from "react";
import { Comment } from "antd";


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
                author={user}
                content={text}
                avatar="https://images-na.ssl-images-amazon.com/images/M/MV5BMjI1NTk0NTc1OV5BMl5BanBnXkFtZTgwNTMwMTE4NDM@._V1_SY500_CR0,0,281,500_AL_.jpg">
                </Comment>
                </div>
         );
    }
}
 
export default Review;