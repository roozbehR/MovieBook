import React from "react";
import { Images } from "../themes";
import "./style.css";
import { Card } from 'antd'

export default function MovieGallery() {
  return (
    <Card title="Recent Movies">
      <div>
        <div className="imagesContainer">
          <div className="row">
            <div>
              <img
                className="imageStyle"
                src={Images.legoMovie}
                alt="legoMovie"
              />
            </div>
            <div>
              <img
                className="imageStyle"
                src={Images.blackPanther}
                alt="legoMovie"
              />
            </div>
            <img
              className="imageStyle"
              src={Images.greenlandMovie}
              alt="legoMovie"
            />
          </div>

          <div className="row">
            <div>
              <img
                className="imageStyle"
                src={Images.greenlandMovie}
                alt="legoMovie"
              />
            </div>
            <div>
              <img
                className="imageStyle"
                src={Images.blackPanther}
                alt="legoMovie"
              />
            </div>
            <img
              className="imageStyle"
              src={Images.legoMovie}
              alt="legoMovie"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
