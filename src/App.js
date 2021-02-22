import React from "react";
import "./App.css";
import { Images } from "./react-components/themes";
import styled from "styled-components";

import { Button } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import RandomMovie from './react-components/random-movie/random-movie'

class App extends React.Component {
  render() {
    return (
      <BackgroundWrapper>
        <div style={{ width: "80%", left: "50%", transform: "translateX(-50%)", position: "relative" }}>
          <RandomMovie />
        </div>
      </BackgroundWrapper>
    );
  }
}

const BackgroundWrapper = styled.div`
  min-height: 100vh;  
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-image: linear-gradient(rgba(0, 0, 0, 0.43), rgba(0, 0, 0, 0.43)),
    url(${Images.movieBackground});
`;

export default App;
