import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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
      <h2 style={title}> Create an Account in Order to Make a Blog Post! </h2>
      <form>
        <div style={field}>
          <div style={fieldName}> Email Address </div>
          <input
            style={fieldInput}
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>

        <div style={field}>
          <div style={fieldName}> Password </div>
          <input
            style={fieldInput}
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <button style={submitButton} type="submit" onClick={onSubmit}>
          Sign up
        </button>
      </form>

      <p>
        Already have an account? <NavLink to="/login">Login</NavLink>
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

const submitButton = {
  backgroundColor: "#ffffff",
  color: "black",
  border: "2px solid #4CAF50",
  borderRadius: "5px",
};

export default Signup;
