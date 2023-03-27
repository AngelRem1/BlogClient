import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  };

  return (
    <div style={container}>
      <h2 style={title}> Login to Start Making Blog Post! </h2>

      <form>
        <div style={field}>
          <div style={fieldName}> Email Address </div>
          <input
            style={fieldInput}
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={field}>
          <div style={fieldName}> Password </div>
          <input
            style={fieldInput}
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={loginButton} onClick={onLogin}>
          Login
        </button>
      </form>

      <p>
        No account yet? <NavLink to="/signup">Sign up</NavLink>
      </p>
    </div>
  );
};

const container = {
  flex: 1,
  textAlign: "center",
  backgroundColor: "#E1FFFF",
  height: "calc(100vh - 60px)",
};

const title = {
  color: "#009879",
  marginBottom: "50px",
};

const field = {
  marginBottom: "1em",
};

const fieldName = {
  color: "#009879",
};

const fieldInput = {
  borderRadius: "10px",
  borderWidth: "thin",
};

const loginButton = {
  backgroundColor: "#ffffff",
  color: "black",
  border: "2px solid #4CAF50",
  borderRadius: "5px",
};

export default Login;
