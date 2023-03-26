import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
        setLogged(true);
      } else {
        console.log("user is logged out");
        setLogged(false);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/"></NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {logged ? (
                <NavLink className="nav-link" to="/add">
                  Create Record
                </NavLink>
              ) : (
                <></>
              )}

              {!logged ? (
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              ) : (
                <></>
              )}

              {!logged ? (
                <NavLink className="nav-link" to="/login">
                  Log In
                </NavLink>
              ) : (
                <></>
              )}

              {logged ? (
                <NavLink className="nav-link" onClick={handleLogout} to="/">
                  Log Out
                </NavLink>
              ) : (
                <></>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
