import React from "react";
import { Row, Col, Card } from "antd";


class Movie extends React.Component {
    state = { 
     }
    render() { 
        const {
            id,
            title,
            year,
            description,
            rating,
            image
        } = this.props.movie;
        return ( 
            <Row>
                <Col xs={14} sm={14} md={16} lg={16} xl={20}>
                        <div className="movie-des">
                            <h3>Due Date</h3>
                            <span>{year}</span>
                            <span>Description</span>
                            <p>{description}</p>
                        </div>
                </Col>
                <Col xs={10} sm={10} md={8} lg={8} xl={4}>
                    <img src={image} style={{width: ""}}></img>
                </Col>
            </Row>
         );
    }
}
 
export default Movie;