import React from "react";
import BackgroundWrapper from "./react-components/background-wrapper/background-wrapper";
import Movie from "./react-components/movie/movie";
import NavBar from "./react-components/navbar/navbar";

class MoviePage extends React.Component {
  render() {
    return (
      <BackgroundWrapper>
        <NavBar />
        <div className="page-container">
          <Movie />
        </div>
      </BackgroundWrapper>
    );
  }
}

export default MoviePage;
