import React from "react";
import { uid } from "react-uid";
import { Button, Rate, Card } from "antd";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingSpin from '../loading-spin/loading-spin';

import "./style.css";

import { getTopMovies } from '../../actions/movies';

class TopMovies extends React.Component {
  state = {
    movies: [],
  };

  componentWillMount() {
    getTopMovies(this)
  }

  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "10px",
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
      <div>
        {this.state.movies.length === 0 && <LoadingSpin />}
        {this.state.movies.length !== 0 &&
        <Card title="Top Movies">
          <Slider {...settings}>
            {this.state.movies.map((movie) => (
                <div key={uid(movie)}>
                  <div className="slick-overlay">
                    <div className="slick-overlay-content">
                      <h5>{movie.title}</h5>
                      <Rate
                          disabled="true"
                          value={movie.tomatoes.viewer.rating}
                          allowHalf="true"
                      />
                      <Button href={`/movie/${movie._id}`} className="slick-button">
                        View Movie
                      </Button>
                    </div>
                  </div>
                  <img className="slick-img" src={movie.poster ?? '/images/default_poster.jpg'} />
                </div>
            ))}
          </Slider>
        </Card>
        }
      </div>
    );
  }
}

export default TopMovies;
