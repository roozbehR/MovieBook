import React from "react";
import SearchBar from "./search-bar";
import "./styles.css";

export default function NavBar() {
  return (
    <div>
      <div className="flex-box">
        <div className="movie-box">
          <div className="defaultText">Movie</div>
        </div>
        <div className="reviews-box">
          <div className="defaultText">Review</div>
        </div>
        <SearchBar />
      </div>
    </div>
  );
}
