import React from "react";
import { Images } from "../themes";
import "./style.css"

export default function MovieGallery(){
  return (
        <div className="contentsContainer">
          <div>
            <div className="titleContainer">
              <div className="titleText">Recent Movies</div>
            </div>

            <div className="imagesContainer">
              <div className="row">
                <div>
                  <img className="imageStyle" src={Images.legoMovie} alt="legoMovie" />
                </div>
                <div>
                  <img className="imageStyle" src={Images.blackPanther} alt="legoMovie" />
                </div>
                <img className="imageStyle" src={Images.greenlandMovie} alt="legoMovie" />
              </div>

              <div className="row">
                <div>
                  <img className="imageStyle" src={Images.greenlandMovie} alt="legoMovie" />
                </div>
                <div>
                  <img className="imageStyle" src={Images.blackPanther} alt="legoMovie" />
                </div>
                <img className="imageStyle" src={Images.legoMovie} alt="legoMovie" />
              </div>
            </div>
          </div>
        </div>
  );
};

