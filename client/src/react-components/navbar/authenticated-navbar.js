import React from "react";
import SearchBar from "./search-bar";
import { MenuTab } from "./menu-tab";
import { Avatar, message } from "antd";
import LogoutButton from './logout-button';

import "./styles.css";

export default function AuthenticatedNavBar(
    {
      userName,
      profileImagePath,
      isAdmin,
}) {
  const handleLogout = async () => {
    localStorage.removeItem("user");
    window.location.reload();
    message.success("Promoted")
  };

  // if userName and profileImagePath are not passed, set default values
  const passedUserName = userName ? userName : "John doe";
  const passedProfileImagePath = profileImagePath
    ? profileImagePath
    : "https://randomuser.me/api/portraits/men/30.jpg";

  return (
    <div className="flex-box">
      <div className="header-menu">
        <MenuTab path="/">Home</MenuTab>
        <MenuTab path="/movies">Movies</MenuTab>
        <MenuTab path="/feed">Feed</MenuTab>
        {isAdmin && <MenuTab path="/admin">Admin</MenuTab>}
      </div>
      <div className="authed-search-box">
        <div>
          <SearchBar />
        </div>
        <div className="user-info-box">
          <div onClick={handleLogout} className="defaultText">{passedUserName}</div>
          <MenuTab path="/profile" className="user-photo-box">
            <Avatar
              src={passedProfileImagePath}
              alt={passedUserName}
              size={55}
            />
          </MenuTab>
          <div className="logoutButtonPosition">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
