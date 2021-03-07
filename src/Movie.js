import React from "react";
import Movie from "./react-components/movie/movie";
import NavBar from "./react-components/navbar/navbar";

import "./movie.css";

class MoviePage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="movie-container">
          <Movie />
        </div>
      </div>
    );
  }
}

export default MoviePage;
