import React from 'react';
import BackgroundWrapper from '../background-wrapper/background-wrapper';
import MovieGallery from '../movie-gallery/movie-gallery';
import NavBar from '../navbar/navbar';
import './style.css';

export default function MovieGalleryPage(){
  return (
      <BackgroundWrapper>
        <NavBar />

        <div className="movieGalleryContainer">
          <MovieGallery />
        </div>
      </BackgroundWrapper>
  );
};


