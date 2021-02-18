import React from "react";
import { Row, Col, Card } from "antd";
import { getRandomReview, getReview } from "../../models/review";
import { getRandomMovie, getMovie } from "../../models/movie";
import Movie from "./movie";
import Review from "./review";
import "./style.css";





class RandomMovie extends React.Component {
    state = { 
        randomReviews: getRandomReview(),
        randomMovie: getRandomMovie()
     }
     
    render() { 
        return ( 
            <Card title={ this.state.randomMovie.title } style={{width: "600px"}}>
                 <Movie movie={ this.state.randomMovie } />
                 <Review review={this.state.randomReviews}/>
            </Card>
         );
    }
}
 
export default RandomMovie;