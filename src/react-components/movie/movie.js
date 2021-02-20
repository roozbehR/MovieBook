import React from 'react';
import { Card, Row, Col, Rate } from 'antd';

import './style.css';

import { getRandomMovie } from '../../models/movie';
import { getRandomReview } from '../../models/review';

import Review from '../review/review';

class Movie extends React.Component {
    state = {
        movie: getRandomMovie(),
        reviews: [
            getRandomReview(),
            getRandomReview(),
            getRandomReview()
        ]
    }

    render() {
        const { Meta } = Card;

        return (
            <Row>
                <Col span={24}>
                    <Card title={
                        <h1>{this.state.movie.title}
                            <Rate disabled="true" value={this.state.movie.rating} allowHalf="true" />
                            <span className="movie-year">{this.state.movie.year}</span>
                        </h1>
                    }>
                        <Row align="center" gutter={[16, 0]}>
                            <Col span={18}>
                                <Card className="light-card">
                                    <h2>Description</h2>
                                    <p>{this.state.movie.description}</p>
                                </Card>
                            </Col>
                            <Col span={4}>
                                <img className="img-movie" src={this.state.movie.image} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                {this.state.reviews.map(review =>
                                    <Review review={review} />
                                )}
                            </Col>
                        </Row>
                    </Card >
                </Col>
            </Row >
        )
    }
}

export default Movie