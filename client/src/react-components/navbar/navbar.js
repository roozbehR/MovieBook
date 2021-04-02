import React, { useState, useEffect } from "react";
import { NotAuthenticatedNavBar } from "./not-authenticated-navbar";
import AuthenticatedNavBar from "./authenticated-navbar";
import "./styles.css";
import { getRandomUser } from "../../models/user";

export default function NavBar(props) {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // remove it later. test purpose
  //   // setUser(getRandomUser());

  //   const json = localStorage.getItem("user");
  //   const savedUser = JSON.parse(json);
  //   if (savedUser) {
  //     setUser(savedUser[0]);
  //   }
  // }, []);

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
