import React from "react";
import SearchBar from "./search-bar";
import {MenuTab} from './menu-tab';
import "./styles.css";

export default function NavBar() {
  return (
    <div>
      <div className="flex-box">
        <div className="header-menu">
          <MenuTab path='/'>Home</MenuTab>
          <MenuTab path='/movies'>Movie</MenuTab>
          <MenuTab path='/movie'>Review</MenuTab>
        </div>
        <SearchBar />
      </div>
    </div>
  );
}
