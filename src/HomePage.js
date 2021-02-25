import React from "react";
import { Row, Col } from 'antd';
import LoginForm from "./react-components/login-form/login-form";
import RandomMovie from "./react-components/random-movie/random-movie";
import TopMovies from "./react-components/top-movies/top-movies";
import "./home-style.css";

class HomePage extends React.Component {
    state = {  }
    render() { 
        return (
            <div>
                <Row className="nav-bar">
                    Navigation bar goes here
                </Row>
                <Row className="content"
                justify="center">
                    <Col md={12} lg={12}>
                        <Row
                        justify="center"
                        gutter={[0, 16]}
                        className="top-movies-random-movies-container">
                            <Col>
                            <TopMovies />
                            </Col>
                            <Col>
                                <RandomMovie />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12} lg={12}>
                        <Row className="login-form-container"
                        align="middle"
                        justify="center">
                            <LoginForm />
                        </Row>
                    </Col>
                </Row>
            </div>
            
          );
    }
}
 
export default HomePage;