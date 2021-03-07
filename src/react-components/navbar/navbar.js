import React, { useState, useEffect } from "react";
import { NotAuthenticatedNavBar } from "./not-authenticated-navbar";
import AuthenticatedNavBar from "./authenticated-navbar";
import "./styles.css";
import { getRandomUser } from "../../models/user";

export default function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // remove it later. test purpose
    setUser(getRandomUser());

    const json = localStorage.getItem("user");
    const savedUser = JSON.parse(json);
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <div>
      {user ? (
        <AuthenticatedNavBar
          userName={user.fullName}
          profileImagePath={user.picture}
          isAdmin={user.isAdmin}
        />
      ) : (
        <NotAuthenticatedNavBar />
      )}
    </div>
  );
}
