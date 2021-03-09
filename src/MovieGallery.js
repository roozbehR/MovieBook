import React from "react";
import BackgroundWrapper from "./react-components/background-wrapper/background-wrapper";
import MovieGallery from "./react-components/movie-gallery/movie-gallery";
import NavBar from "./react-components/navbar/navbar";

import "./App.css";

export default function MovieGalleryPage() {
  return (
    <BackgroundWrapper>
      <NavBar />
      <div className="page-container">
        <MovieGallery />
      </div>
    </BackgroundWrapper>
  );
}
