import React, { useState } from "react";
import './styles.css';

export default function SearchBar (){
  const [input, setInput] = useState('');
  const updateInput = async (input) => {
    setInput(input);
  }
  return (
      <div className="search-bar-box">
        <input
            className="search-bar"
            key="random1"
            value={input}
            placeholder={"ENTER MOVIE NAME"}
            onChange={(e) => updateInput(e.target.value)}
        />
        <div className="search-button-box">
          <button className="button">SEARCH</button>
        </div>
      </div>
  );
}
