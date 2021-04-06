import React from "react";
import { Row, Col, Card } from "antd";
import "./movie-overview.module.css";


export default function MovieOverview({ sectionTitle, imgURL, movieId, movieTitle, screeningYear, plot }) {
  return (
    <div>
      {sectionTitle && (
        <Card title={sectionTitle} className="random-movie-card">
          <CardContents imgURL={imgURL} movieId={movieId} movieTitle={movieTitle} screeningYear={screeningYear} plot={plot} />
        </Card>
      )}
      {!sectionTitle &&
        <Card className="random-movie-card">
          <CardContents imgURL={imgURL} movieId={movieId} movieTitle={movieTitle} screeningYear={screeningYear} plot={plot} />
        </Card>}
    </div>
  );
}

function CardContents({ imgURL, movieId, movieTitle, screeningYear, plot }) {
  return (
    <Row>
      <Col xs={10} sm={10} md={8} lg={8} xl={4}>
        <div className="post-image">
          <img src={imgURL ?? '/images/default_poster.jpg'} alt="No Image Available" />
        </div>
      </Col>
      <Col xs={14} sm={14} md={16} lg={16} xl={20}>
        <div className="movie-des">
          <h3 className="movie-name">
            <a href={`movie/${movieId}`}>{movieTitle}</a>
          </h3>
          <p className="release-date">
            {screeningYear}{" "}
          </p>
          <p className="description">{plot}</p>
        </div>
      </Col>
    </Row>
  );
}
