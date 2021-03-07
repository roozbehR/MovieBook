import React from "react";
import SearchBar from "./search-bar";
import { MenuTab } from "./menu-tab";
import "./styles.css";

export const NotAuthenticatedNavBar = () => {
  return (
    <div className="flex-box">
      <div className="header-menu">
        <MenuTab path="/">Home</MenuTab>
        <MenuTab path="/movies">Movie</MenuTab>
        <MenuTab path="/movie">Review</MenuTab>
      </div>
      <div className="not-authed-search-box">
        <SearchBar />
      </div>
    </div>
  );
};
