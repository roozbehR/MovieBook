import React from "react";
import "./style.css";

export default function BackgroundWrapper({children}){
  return(
      <div className="backgroundWrapper">
        {children}
      </div>
  );
}

