import React from "react";
import BackgroundWrapper from "./react-components/background-wrapper/background-wrapper";
import Feed from "./react-components/feed/feed";
import NavBar from "./react-components/navbar/navbar";

class UserFeed extends React.Component {
  render() {
    return (
      <BackgroundWrapper>
        <NavBar />
        <div className="page-container">
          <Feed />
        </div>
      </BackgroundWrapper>
    );
  }
}

export default UserFeed;
