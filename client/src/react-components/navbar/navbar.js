import React, { useState, useEffect } from "react";
import { NotAuthenticatedNavBar } from "./not-authenticated-navbar";
import AuthenticatedNavBar from "./authenticated-navbar";
import "./styles.css";
import { getRandomUser } from "../../models/user";

export default function NavBar(props) {
  return (
    <div>
      {props.user ? (
        <AuthenticatedNavBar
          userName={props.user.fullName}
          profileImagePath={props.user.picture}
          isAdmin={props.user.isAdmin}
        />
      ) : (
        <NotAuthenticatedNavBar />
      )}
    </div>
  );
}
