import React from "react";
import SearchBar from "./search-bar";
import { MenuTab } from "./menu-tab";
import "./styles.css";
import { Avatar } from "antd";

export default function AuthenticatedNavBar({userName, profileImagePath, isAdmin}) {
  // if userName and profileImagePath are not passed, set default values
  const passedUserName = userName ? userName : "John doe";
  const passedProfileImagePath = profileImagePath
    ? profileImagePath
    : "https://randomuser.me/api/portraits/men/30.jpg";

  return (
    <div className="flex-box">
      <div className="header-menu">
        <MenuTab path="/">Home</MenuTab>
        <MenuTab path="/movies">Movie</MenuTab>
        <MenuTab path="/movie">Review</MenuTab>
        {isAdmin && <MenuTab path='/admin'>Admin</MenuTab> }
      </div>
      <div className="authed-search-box">
        <div>
          <SearchBar />
        </div>
        <div className="user-info-box">
          <div className="defaultText">{passedUserName}</div>
          <div className="user-photo-box">
            <Avatar
              src={passedProfileImagePath}
              alt={passedUserName}
              size={55}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
