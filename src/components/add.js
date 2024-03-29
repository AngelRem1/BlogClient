import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

export default function Add() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setLogged(true);
      } else {
        console.log("user is logged out");
        setLogged(false);
      }
    });
  }, []);
  // useState variable to keep track of our form
  const [form, setForm] = useState({
    name: "",
    entry: "",
  });

  // initiating useNavigate()
  const navigate = useNavigate();

  // updating form through spread function
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  // async function in order to handle submits
  async function submitForm(e) {
    e.preventDefault();

    const newJournal = { ...form };
    newJournal.email = email;
    console.log(newJournal);
    // await fetch
    await fetch("https://dark-teal-millipede-slip.cyclic.app/journals/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJournal),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", entry: "" });
    navigate("/");
  }
  if (logged) {
    return (
      <div style={container}>
        <h2 style={title}> Create a New Journal Entry! </h2>

        <form onSubmit={submitForm}>
          <div style={field}>
            <div style={fieldName}> Name </div>
            <input
              style={fieldInput}
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>

          <div style={field}>
            <div style={fieldName}> Entry </div>
            <input
              style={fieldInput}
              type="text"
              id="entry"
              value={form.entry}
              onChange={(e) => updateForm({ entry: e.target.value })}
            />
          </div>

          <input style={submitButton} type="submit" value="Create journal" />
        </form>
      </div>
    );
  } else {
    return <div>Please Log In before you can add a journal entry!</div>;
  }
}

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
