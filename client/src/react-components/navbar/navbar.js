import React from "react";
import { NotAuthenticatedNavBar } from "./not-authenticated-navbar";
import AuthenticatedNavBar from "./authenticated-navbar";
import "./styles.css";

export default function NavBar(props) {
  return (
    <div>
      {props.user ? (
        <AuthenticatedNavBar
          userName={props.user.username}
          profileImagePath={props.user.picture}
          isAdmin={props.user.isAdmin}
        />
      ) : (
        <NotAuthenticatedNavBar />
      )}
    </div>
  );
}
