import React from "react";
import { uid } from "react-uid";
import { Button, Rate, Card } from "antd";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./style.css";

import { getRandomMovie } from "../../models/movie";

class TopMovies extends React.Component {
  state = {
    movies: [
      getRandomMovie(),
      getRandomMovie(),
      getRandomMovie(),
      getRandomMovie(),
      getRandomMovie(),
    ],
  };

  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "5px",
      slidesToShow: 3,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 4000,
      cssEase: "ease-out",
      pauseOnHover: true,
      swipeToSlide: true,
      focusOnSelect: true,
    };

    return (
      <Card title="Top Movies">
        <div>
          <Slider {...settings}>
            {this.state.movies.map((movie) => (
              <div key={uid(movie)}>
                <div className="slick-overlay">
                  <div className="slick-overlay-content">
                    <h5>{movie.title}</h5>
                    <Rate
                      disabled="true"
                      value={movie.rating}
                      allowHalf="true"
                    />
                    <Button href="movie" className="slick-button">
                      View Movie
                    </Button>
                  </div>
                </div>
                <img className="slick-img" src={movie.image} />
              </div>
            ))}
          </Slider>
        </div>
      </Card>
    );
  }
}

export default TopMovies;
