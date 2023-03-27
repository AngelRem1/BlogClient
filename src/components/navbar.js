import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import { useNavigate } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [hoverSign, setHoverSign] = useState(false);
  const [hoverLog, setHoverLog] = useState(false);
  const [hoverCreate, setHoverCreate] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);

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
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const sign = {
    color: hoverSign ? "black" : "#34495e",
    padding: "10px 15px",
    textTransform: "uppercase",
    textAlign: "center",
    display: "block",
  };
  const log = {
    color: hoverLog ? "black" : "#34495e",
    padding: "10px 15px",
    textTransform: "uppercase",
    textAlign: "center",
    display: "block",
  };
  const create = {
    color: hoverCreate ? "black" : "#34495e",
    padding: "10px 15px",
    textTransform: "uppercase",
    textAlign: "center",
    display: "block",
  };
  const logout = {
    color: hoverLogout ? "black" : "#34495e",
    padding: "10px 15px",
    textTransform: "uppercase",
    textAlign: "center",
    display: "block",
  };

  return (
    <header style={nav}>
      <h2 style={title} onClick={() => navigate("/")}>
        {" "}
        Angel's Blog{" "}
      </h2>

      {!logged ? (
        <ul style={navComponents}>
          <li
            onMouseEnter={() => setHoverSign(true)}
            onMouseLeave={() => setHoverSign(false)}
            onClick={() => navigate("/signup")}
          >
            <div style={sign}>Sign Up</div>
          </li>
          <li
            onMouseEnter={() => setHoverLog(true)}
            onMouseLeave={() => setHoverLog(false)}
            onClick={() => navigate("/login")}
          >
            <div style={log}>Login</div>
          </li>
        </ul>
      ) : (
        <ul style={navComponents}>
          <li
            onMouseEnter={() => setHoverCreate(true)}
            onMouseLeave={() => setHoverCreate(false)}
            onClick={() => navigate("/add")}
          >
            <div style={create}>Create Entry</div>
          </li>
          <li
            onMouseEnter={() => setHoverLogout(true)}
            onMouseLeave={() => setHoverLogout(false)}
            onClick={() => handleLogout()}
          >
            <div style={logout}>Log Out</div>
          </li>
        </ul>
      )}
    </header>
  );
}

const nav = {
  display: "flex",
  flexDirection: "row",
  paddingTop: ".5em",
  paddingBottom: ".5em",
  border: "1px solid #a2a2a2",
  backgroundColor: "#f4f4f4",
  boxShadow: "0 0 40px rgba(0, 0, 0, 0.15)",
  borderRadius: "5px",
};

const navComponents = {
  display: "flex",
  justifyContent: "flex-end",
  width: "90%",
  marginleft: "auto",
  marginTop: "auto",
  marginBottom: "auto",
  fontSize: ".99em",
  listStyle: "none",
};

// const link = {

// };
const title = {
  fontSize: "1.45em",
  marginTop: "auto",
  marginBottom: "auto",
};
