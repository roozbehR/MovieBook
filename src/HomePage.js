import React from "react";
import { Row, Col } from "antd";
import LoginForm from "./react-components/login-form/login-form";
import RandomMovie from "./react-components/random-movie/random-movie";
import TopMovies from "./react-components/top-movies/top-movies";
import BackgroundWrapper from "./react-components/background-wrapper/background-wrapper";
import "./home-style.css";
import NavBar from "./react-components/navbar/navbar";

class HomePage extends React.Component {
  state = {};

  render() {
    const authenticated = localStorage["user"] != null;

    return (
      <BackgroundWrapper>
        <NavBar />
        <br />
        <Row className="content" justify="center">
          <Col md={authenticated ? 12 : 12}>
            <Row
              justify="center"
              gutter={[0, 16]}
              className="top-movies-random-movies-container"
            >
              <Col>
                <TopMovies />
              </Col>
              <Col>
                <RandomMovie />
              </Col>
            </Row>
          </Col>
          {!authenticated && (
            <Col md={12} lg={12}>
              <Row className="login-form-container" justify="center">
                <LoginForm />
              </Row>
            </Col>
          )}
        </Row>
      </BackgroundWrapper>
    );
  }
}

export default HomePage;
