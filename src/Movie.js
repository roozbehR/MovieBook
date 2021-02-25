import React from "react";
import { Row, Col } from 'antd';
import Movie from './react-components/movie/movie'

import './movie.css'

class HomePage extends React.Component {
    render() {
        return (
            <div className="movie-container">
                <Movie />
            </div>
        );
    }
}

export default HomePage;